import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';
import { Task } from '../core/model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tasks: Observable<Task[]>;
  displayedColumns = ['id', 'nome', 'descricao', 'completo'];

  constructor(private taskService: TasksService) {
    this.tasks = this.taskService.list();
  }
  ngOnInit(): void {
  }

}
