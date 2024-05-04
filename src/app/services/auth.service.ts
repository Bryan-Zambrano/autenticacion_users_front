import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _isAuthenticated: boolean = false;
  constructor() { }

  saveData(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    //return data ? JSON.parse(data) : null;
    return data;
  }

  decodeToken(token:string){
    return jwtDecode(token);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

}
