import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from '../../api-services/session-storage.service';

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
  selector: 'app-sensitive-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sensitive-data.component.html',
  styleUrls: ['./sensitive-data.component.scss']
})
export class SensitiveDataComponent implements OnInit {
  sensitiveDataList: SensitiveDataItem[] = [];
  newItemTitle: string = '';
  newItemUsername: string = '';
  newItemPassword: string = '';

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.loadSensitiveData();
  }

  loadSensitiveData(): void {
    const data = this.sessionStorageService.getItem('sensitiveData');
    if (data) {
      this.sensitiveDataList = JSON.parse(data).map((item: SensitiveDataItem) => ({
        ...item,
        showUsername: false,
        showPassword: false,
        isEditing: false
      }));
    }
  }

  saveSensitiveData(): void {
    this.sessionStorageService.setItem('sensitiveData', JSON.stringify(this.sensitiveDataList));
  }

  addItem(): void {
    if (this.newItemTitle && this.newItemUsername && this.newItemPassword) {
      const newItem: SensitiveDataItem = {
        id: Date.now().toString(),
        title: this.newItemTitle,
        username: this.newItemUsername,
        password: this.newItemPassword,
        showUsername: false,
        showPassword: false,
        isEditing: false
      };
      this.sensitiveDataList.push(newItem);
      this.saveSensitiveData();
      this.newItemTitle = '';
      this.newItemUsername = '';
      this.newItemPassword = '';
    }
  }

  toggleShow(item: SensitiveDataItem, field: 'username' | 'password'): void {
    if (field === 'username') {
      item.showUsername = !item.showUsername;
    } else {
      item.showPassword = !item.showPassword;
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  editItem(item: SensitiveDataItem): void {
    item.isEditing = true;
  }

  saveEdit(item: SensitiveDataItem): void {
    item.isEditing = false;
    this.saveSensitiveData();
  }

  deleteItem(id: string): void {
    this.sensitiveDataList = this.sensitiveDataList.filter(item => item.id !== id);
    this.saveSensitiveData();
  }
}
