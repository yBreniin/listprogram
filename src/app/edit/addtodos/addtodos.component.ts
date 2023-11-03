import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm } from '@angular/forms'; // Importe FormBuilder e FormGroup
import { Task } from 'src/app/core/model';
import { TasksService } from 'src/app/tasks.service';
import { TaskSelectionService } from '../task-selection.service';

@Component({
  selector: 'app-addtodos',
  templateUrl: './addtodos.component.html',
  styleUrls: ['./addtodos.component.scss']
})
export class AddtodosComponent implements OnInit {
  disableSelect = new FormControl(false);
  editForm: FormGroup; // Altere o tipo para FormGroup

  novoTodo: Task = {
    nome: '',
    descricao: '',
    completo: ''
  };

  constructor(private tasksService: TasksService, private formBuilder: FormBuilder, private taskSelection: TaskSelectionService) {
    this.editForm = this.formBuilder.group({}); // Inicialize o FormGroup no construtor
  }

  ngOnInit() {
    // Adicione lógica de inicialização, se necessário
  }

  adicionarTodo() {
    if (this.editForm.valid) {
      this.tasksService.adicionarTask(this.novoTodo).subscribe(
        response => {
          console.log('Tarefa adicionada com sucesso!', response);

          // Recarrega a lista de tarefas após adicionar uma nova tarefa
          this.taskSelection.notifyTaskUpdated();

          // Limpa o formulário após adicionar a tarefa
          this.limparFormulario();
        },
        error => {
          console.error('Erro ao adicionar tarefa:', error);
        }
      );
    } else {
      console.log('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  limparFormulario() {
    this.novoTodo = {
      nome: '',
      descricao: '',
      completo: ''
    };
  }
}
