import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogLoginI, UserI } from './interfaces/user.interface';
import { ApiResponseI } from './interfaces/shared.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public login(user: UserRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.urlLocalApi}/auth/login`, user);
  }

  public getUserByEmail(userEmail: string): Observable<ApiResponseI<any>> {
    //const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { email: userEmail };
    return this.httpClient.get<ApiResponseI<any>>(`${environment.urlLocalApi}/user/userByEmail`, { params: params },);
  }

  public getUserByUsername(userName: string): Observable<ApiResponseI<UserI>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { username: userName };
    return this.httpClient.get<ApiResponseI<UserI>>(`${environment.urlLocalApi}/user/userByUserName`, { params: params, headers:headers },);
  }

  public getLogsByUserId(user_id: number): Observable<ApiResponseI<LogLoginI>> {
    const params = { user_id: user_id };
    return this.httpClient.get<ApiResponseI<LogLoginI>>(`${environment.urlLocalApi}/user/logsByUserId`, { params: params,},);
  }



}

export interface UserRequest {
  userName: string,
  userPassword: string
}
