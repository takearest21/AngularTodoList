import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../api-services/session-storage.service';
import { FormsModule } from '@angular/forms';

interface SensitiveDataItem {
  id: string;
  title: string;
  username: string;
  password: string;
  showUsername: boolean;
  showPassword: boolean;
  isEditing: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  version: string = '1.0.0';
  sensitiveDataList: SensitiveDataItem[] = [];

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.loadSensitiveData();
  }

  loadSensitiveData(): void {
    const data = this.sessionStorageService.getItem('sensitiveData');
    if (data) {
      this.sensitiveDataList = JSON.parse(data).map((item: SensitiveDataItem) => ({
        ...item,
        showUsername: true,
        showPassword: false,
        isEditing: false
      }));
    }
  }

  exportData(): void {
    const dataToExport = JSON.stringify(this.sensitiveDataList);
    const encodedData = btoa(dataToExport); // Simple Base64 encoding

    const blob = new Blob([encodedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sensitive_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importData(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const encodedData = e.target?.result as string;
        const decodedData = atob(encodedData); // Simple Base64 decoding
        const importedList: SensitiveDataItem[] = JSON.parse(decodedData);

        // Basic validation for imported data structure
        if (Array.isArray(importedList) && importedList.every(item =>
          item.id && item.title && item.username && item.password
        )) {
          this.sensitiveDataList = importedList.map(item => ({
            ...item,
            showUsername: true,
            showPassword: false,
            isEditing: false
          }));
          this.saveSensitiveData();
          alert('Sensitive data imported successfully!');
        } else {
          alert('Invalid file format. Please upload a valid sensitive data JSON file.');
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Failed to import data. Please ensure the file is valid.');
      }
    };

    reader.readAsText(file);
  }

  saveSensitiveData(): void {
    this.sessionStorageService.setItem('sensitiveData', JSON.stringify(this.sensitiveDataList));
  }

  clearSessionData(): void {
    this.sessionStorageService.clearSession();
    alert('All session data has been deleted.');
  }
}
