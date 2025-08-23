import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../api-services/session-storage.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  version: string = '1.0.0';

  constructor(private sessionStorageService: SessionStorageService) {}

  clearSessionData(): void {
    this.sessionStorageService.clearSession();
    alert('All session data has been deleted.');
  }
}
