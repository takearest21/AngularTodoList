import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({providedIn: 'root'}) 
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  addTask(task: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, { task }).pipe(
      catchError((error) => {
        console.error('Error adding task:', error);
        return throwError(() => new Error('Error adding task'));
        })
    );
}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`).pipe(
      
      catchError((error) =>{
        console.log('Error fetching tasks:', error);
        return throwError(() => new Error('Error fetching tasks'));
      })  // You can add any additional operators here if needed
    );
  } 

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting task:', error);
        return throwError(() => new Error('Error deleting task'));
      })
    );
  }
}