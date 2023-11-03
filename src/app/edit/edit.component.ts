import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../core/model';
import { TasksService } from '../tasks.service';
import { TaskSelectionService } from './task-selection.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  selectedTask?: Task;
  displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'completo'];
  dataSource = new MatTableDataSource<Task>();
  selection = new SelectionModel<Task>(true, []);

  constructor(
    private taskService: TasksService,
    private taskSelectionService: TaskSelectionService
    ) {}

  ngOnInit(): void {
    this.loadDataFromApi();
    this.subscribeToTaskUpdates();
  }

  subscribeToTaskUpdates() {
    this.taskSelectionService.taskUpdated$.subscribe(() => {
      this.loadDataFromApi();
    });
  }

  onCheckboxChangeHeader() {
    if (this.isAllSelected()) {
      this.selection.clear();
      console.log('Selection cleared.');
    } else {
      this.toggleAllRows();
      console.log('All rows selected:', this.selection.selected);
    }
  }


  onCheckboxChange(row: Task) {
    this.selection.toggle(row);
    console.log('Checkbox changed for row:', row);
  }


  loadDataFromApi() {
    this.taskService.list()
      .subscribe(data => {
        console.log('Data from API:', data);
        this.dataSource.data = data;
        console.log('DataSource Data:', this.dataSource.data);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      console.log('Selection cleared.');
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log('All rows selected:', this.selection.selected);
  }

  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id! + 1}`;
  }

  showAddT = false;
  showEditT = false;

  openAddT() {
    this.showAddT = true;
    this.showEditT = false;
  }

  openEditSelected() {
    this.showEditT = true;
    this.showAddT = false;
    const selectedTasks = this.selection.selected;

    if (selectedTasks.length > 0) {
      console.log("selectedTasks", selectedTasks);
      this.taskSelectionService.setSelectedTasks(selectedTasks);
    } else {
      console.log('Nenhuma tarefa selecionada para editar.');
    }
  }

  markAllComplete() {
    const selectedTasks = this.selection.selected;

    if (selectedTasks.length > 0) {
      selectedTasks.forEach(task => {
        task.completo = 'S';
        this.taskService.updateTask(task).subscribe(updatedTask => {
          console.log('Tarefa atualizada:', updatedTask);
        });
      });

      // Atualizando a tabela
      this.dataSource.data = [...this.dataSource.data];

      console.log('Todos os TODOs marcados como completos.');
    } else {
      console.log('Nenhuma tarefa selecionada para marcar como completa.');
    }
  }

  isAnyTaskSelected(): boolean {
    return this.selection.selected.length > 0;
  }

}
