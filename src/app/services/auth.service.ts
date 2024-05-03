import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _isAuthenticated: boolean = false;
  constructor() { }

  saveData(key: string, value: any) {
    localStorage.setItem("token", value);
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

}
