import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private readonly TASKS_KEY = 'tasks';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
   
    this.isBrowser = isPlatformBrowser(platformId);
    console.log(this.isBrowser)
  }

  addTask(task: string): void {
    
    if (this.isBrowser) {
      let tasks = this.getTasks();
      const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      tasks.push({ id: id, task: task });
      sessionStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }
  }

  getTasks(): any[] {
    if (this.isBrowser) {
      const tasksString = sessionStorage.getItem(this.TASKS_KEY);
      return tasksString ? JSON.parse(tasksString) : [];
    } else {
      return [];
    }
  }

  deleteTask(id: number): void {
    console.log("Deleting task with id:", id);
    if (this.isBrowser) {
      let tasks = this.getTasks();
      tasks = tasks.filter(task => task.id !== id);
      sessionStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }
  }

  updateTask(id: number, updatedTask: any): void {
    if (this.isBrowser) {
      let tasks = this.getTasks();
      const index = tasks.findIndex(task => task.id === id);
      if (index > -1) {
        tasks[index] = updatedTask;
        sessionStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
      }
    }
  }
}
