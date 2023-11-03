import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class TaskSelectionService {
  private selectedTasksSource = new Subject<Task[]>();
  selectedTasks$ = this.selectedTasksSource.asObservable();

  setSelectedTasks(tasks: Task[]) {
    this.selectedTasksSource.next(tasks);
  }

  private updateSource = new BehaviorSubject<boolean>(false);
  taskUpdated$ = this.updateSource.asObservable();

  notifyTaskUpdated() {
    this.updateSource.next(true);
  }

  constructor() { }
}
