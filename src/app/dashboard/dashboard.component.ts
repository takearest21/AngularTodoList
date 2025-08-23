import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SensitiveDataComponent } from '../sensitive-data/sensitive-data.component';
import { TodoList } from '../todo-list/todo-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SensitiveDataComponent, TodoList],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeTab: string = 'sensitiveData';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
