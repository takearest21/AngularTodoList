import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError, of } from "rxjs";
import { SessionStorageService } from './session-storage.service';

@Injectable({providedIn: 'root'}) 
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  public mongoAvailable: boolean = false;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
     this.checkMongoConnection();
     if (!this.mongoAvailable) {
        this.getTasks();
      //  console.warn("MongoDB is not available, using session storage as fallback.");
     }
  }

  checkMongoConnection(): void {
    this.http.get(`${this.apiUrl}/api/mongo/status`).subscribe({
      next: (response: any) => {
        this.mongoAvailable = response.status === 'connected';
      },
      error: (error) => {
        // console.error('Error checking MongoDB connection:', error);
        this.mongoAvailable = false;
      }
    });
  }

  addTask(task: string): Observable<any> {
    if (this.mongoAvailable) {
      return this.http.post(`${this.apiUrl}/tasks`, { task }).pipe(
        catchError((error) => {
          console.error('Error adding task:', error);
          return throwError(() => new Error('Error adding task'));
        })
      );
    } else {
      this.sessionStorageService.addTask(task);
      return of(null); // Return an Observable to match the signature
    }
  }

  getTasks(): Observable<any[]> {
    if (this.mongoAvailable) {
      return this.http.get<any[]>(`${this.apiUrl}/tasks`).pipe(
        catchError((error) =>{
          console.log('Error fetching tasks:', error);
          return throwError(() => new Error('Error fetching tasks'));
        })  // You can add any additional operators here if needed
      );
    } else {
      return of(this.sessionStorageService.getTasks());
    }
  }

  deleteTask(id: number): Observable<any> {
    if (this.mongoAvailable) {
      return this.http.delete(`${this.apiUrl}/tasks/${id}`).pipe(
        catchError((error) => {
          console.error('Error deleting task:', error);
          return throwError(() => new Error('Error deleting task'));
        })
      );
    } else {
      console.log("Deleting task with id:", id);
      this.sessionStorageService.deleteTask(id);
      return of(null); // Return an Observable to match the signature
    }
  }

  updateTask(id: number, updatedTask: any): Observable<any> {
    if (this.mongoAvailable) {
      return this.http.put(`${this.apiUrl}/tasks/${id}`, updatedTask).pipe(
        catchError((error) => {
          console.error('Error updating task:', error);
          return throwError(() => new Error('Error updating task'));
        })
      );
    } else {
      this.sessionStorageService.updateTask(id, updatedTask);
      return of(null); // Return an Observable to match the signature
    }
  }
}
