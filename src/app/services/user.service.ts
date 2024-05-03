import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public login(user: UserRequest): Observable<UserI> {
    console.log(user);
    return this.httpClient.post<UserI>(`${environment.urlLocalApi}/user/login`, user);
  }

}

export interface UserRequest {
  userName: string,
  userPassword: string
}

export interface UserI {
  id: number;
  userName: string;
  userPassword: string;
  userEmail: string;
  userIsActive: boolean;
  statusUser: boolean;
  userPerson: PersonI;
  rolList: RolI[];
}

export interface PersonI {
  // Define la estructura de la entidad Person aquí según tu caso
}

export interface RolI {
  // Define la estructura de la entidad Rol aquí según tu caso
}

