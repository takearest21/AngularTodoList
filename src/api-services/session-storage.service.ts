import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  // Task-related methods
  private getTasksFromSessionStorage(): any[] {
    if (this.isBrowser) {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    }
    return [];
  }

  private saveTasksToSessionStorage(tasks: any[]): void {
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  addTask(task: any): void {
    const tasks = this.getTasksFromSessionStorage();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.push({ id: newId, name: task, completed: false });
    this.saveTasksToSessionStorage(tasks);
  }

  getTasks(): any[] {
    return this.getTasksFromSessionStorage();
  }

  deleteTask(id: number): void {
    let tasks = this.getTasksFromSessionStorage();
    tasks = tasks.filter(task => task.id !== id);
    this.saveTasksToSessionStorage(tasks);
  }

  updateTask(id: number, updatedTask: any): void {
    let tasks = this.getTasksFromSessionStorage();
    tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
    this.saveTasksToSessionStorage(tasks);
  }

  setLastActiveTab(tabName: string): void {
    this.setItem('lastActiveTab', tabName);
  }

  getLastActiveTab(): string | null {
    return this.getItem('lastActiveTab');
  }

  clearSession(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
