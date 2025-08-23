import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { ApiService } from '../../api-services/api.services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
// import { TodoItem } from '../app'; // No longer needed as TodoItem is not used directly here

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
      this.apiService.addTask(this.newTask).subscribe({
        next: (response) => {
          this.newTask = ""; // Clear the input field after adding the task
          this.ngOnInit(); // Refresh the task list
          document.getElementById('taskInput')?.focus(); // Set focus back to the input
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
      });
    }
  }

  toggleCompleted(task: any): void {
    const updatedTask = { ...task, completed: !task.completed };
    const id = this.apiService.mongoAvailable ? updatedTask._id : updatedTask.id;

    this.apiService.updateTask(id, updatedTask).subscribe({
      next: (response) => {
        this.ngOnInit(); // Refresh the task list to reflect the change from the backend
      },
      error: (error) => {
        console.error('Error updating task:', error);
        // Revert the change if the API call fails to maintain UI consistency with backend
        task.completed = !updatedTask.completed;
      }
    });
  }

  deleteTask(task: any): void {
    const id = this.apiService.mongoAvailable ? task._id : task.id;
    this.apiService.deleteTask(id).subscribe({
      next: (response) => {
        this.ngOnInit(); // Refresh the task list
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}
