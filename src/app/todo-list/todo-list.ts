import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { ApiService } from '../../api-services/api.services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../app';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,NgFor,NgClass],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList {
  tasks: any[] = [];
  isLoading: boolean = false;
  newTask: string = "";

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.apiService.getTasks().subscribe({
      next: (data) => {
        // console.log("Fetched tasks:", data);
        this.tasks = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false;
      }
    });
  }


  addTask() :void{
    
    if(this.newTask.trim() !== "") {
      const newTodoItem : TodoItem = {
          id : Date.now(),
          task : this.newTask,
          completed: false
      }
      this.tasks.push(newTodoItem);
      this.newTask = ""; // Clear the input field after adding the task
      document.getElementById('taskInput')?.focus(); // Set focus back to the input
    }
    console.log(this.tasks);
  }

  toggleCompleted(index: number): void{
    console.log("Toggle completed for index:", index);
    this.tasks[index].completed = !this.tasks[index].completed;
    console.log("Updated todo item:", this.tasks) ;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(todo => todo._id !==id);
    console.log("Todo item deleted with id:", id);
    console.log("Updated todo list:", this.tasks);
  }
}
