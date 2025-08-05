import { NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
 
export interface TodoItem{
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule, TodoList, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  todoList : TodoItem[] = [];



  

}
