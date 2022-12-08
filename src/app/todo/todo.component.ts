import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(private todoService: TodoService) {}
  todos: any[] = [];
  ngOnInit() {
    this.todoService.fireStoreCollection
      .valueChanges({ idField: 'id' })
      .subscribe((item: any[]) => {
        this.todos = item.sort((a: any, b: any) => a.isDone - b.isDone);
      });
  }

  onClick(task: HTMLInputElement) {
    if (task.value) {
      this.todoService.addTodo(task.value);
      task.value = '';
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }
} 
