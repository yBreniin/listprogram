import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './core/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly API = 'http://localhost:8000/tasks/'

  constructor(private http: HttpClient) { }

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.API}${task.id}/`;
    return this.http.put<Task>(url, task);
  }

  adicionarTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API, task);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.API}${id}/`;
    return this.http.delete<void>(url);
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.API}${id}/`;
    return this.http.get<Task>(url);
  }
}
