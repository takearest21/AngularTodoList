import { NgClass, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem{
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,NgFor,NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  todoList : TodoItem[] = [];
  newTask: string = "";

  addTask() :void{
    
    if(this.newTask.trim() !== "") {
      const newTodoItem : TodoItem = {
          id : Date.now(),
          task : this.newTask,
          completed: false
      }
      this.todoList.push(newTodoItem);
      this.newTask = ""; // Clear the input field after adding the task
    }
    console.log(this.todoList);
  }

  toggleCompleted(index: number): void{
    console.log("Toggle completed for index:", index);
    this.todoList[index].completed = !this.todoList[index].completed;
    console.log("Updated todo item:", this.todoList) ;
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(todo => todo.id !==id);
    console.log("Todo item deleted with id:", id);
    console.log("Updated todo list:", this.todoList);
  }

}
