import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/tasks.service';
import { Task } from 'src/app/core/model';
import { TaskSelectionService } from '../task-selection.service';

@Component({
  selector: 'app-editodos',
  templateUrl: './editodos.component.html',
  styleUrls: ['./editodos.component.scss'],
})
export class EditodosComponent implements OnInit {
  taskForm!: FormGroup;
  taskOptions: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    private taskSelection: TaskSelectionService
  ) {}

  ngOnInit() {
    this.loadTaskOptions();

    this.taskForm = this.formBuilder.group({
      selectedTask: [null, Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      completo: ['N', Validators.required],
    });

    const selectedTask = this.taskForm.get('selectedTask')?.value;
    if (selectedTask) {
      this.onTaskSelected(selectedTask);
    }
  }

  loadTaskOptions() {
    this.tasksService.list().subscribe(
      (tasks: Task[]) => {
        this.taskOptions = tasks;
      },
      (error) => {
        console.error('Erro ao carregar as tarefas:', error);
      }
    );
  }

  onTaskSelected(selectedTask: Task) {
    this.taskForm?.patchValue({
      nome: selectedTask.nome,
      descricao: selectedTask.descricao,
      completo: selectedTask.completo === 'S',
    });
  }

  onSubmit() {
  }

  lastDeletedTaskId: number | null = null;

  onDelete() {
    // Obtém o ID da tarefa selecionada
    const taskId = this.taskForm.get('selectedTask')?.value?.id;

    // Verifica se há um ID válido
    if (taskId) {
      // Chama o serviço para excluir a tarefa
      this.tasksService.deleteTask(taskId).subscribe(
        () => {
          console.log('Tarefa excluída com sucesso.');

          this.taskSelection.notifyTaskUpdated();

          // Recarrega a lista de tarefas após a exclusão
          this.loadTaskOptions();
        },
        (error) => {
          console.error('Erro ao excluir a tarefa:', error);
        }
      );
    }
  }

  onConfirm() {
    const selectedTask = this.taskForm.get('selectedTask')?.value;

    if (selectedTask) {
      selectedTask.nome = this.taskForm.get('nome')?.value;
      selectedTask.descricao = this.taskForm.get('descricao')?.value;
      selectedTask.completo = this.taskForm.get('completo')?.value ? 'S' : 'N';

      this.tasksService.updateTask(selectedTask).subscribe(
        () => {
          console.log('Tarefa atualizada com sucesso.');
        },
        (error) => {
          console.error('Erro ao atualizar a tarefa:', error);
        }
      );
    }
    this.taskSelection.notifyTaskUpdated();
  }
}
