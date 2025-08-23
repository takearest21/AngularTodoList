import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SensitiveDataComponent } from '../sensitive-data/sensitive-data.component';
import { TodoList } from '../todo-list/todo-list';
import { Settings } from '../settings/settings';
import { SessionStorageService } from '../../api-services/session-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SensitiveDataComponent, TodoList, Settings],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTab: string = 'sensitiveData';

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    const lastActiveTab = this.sessionStorageService.getLastActiveTab();
    if (lastActiveTab) {
      this.activeTab = lastActiveTab;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.sessionStorageService.setLastActiveTab(tab);
  }
}
