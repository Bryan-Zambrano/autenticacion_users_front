import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI } from './interfaces/user.interface';
import { ApiResponseI } from './interfaces/shared.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public login(user: UserRequest): Observable<ApiResponseI<UserI>> {
    return this.httpClient.post<ApiResponseI<UserI>>(`${environment.urlLocalApi}/user/login`, user);
  }

  public getUserByEmail(userEmail: string): Observable<ApiResponseI<any>> {
    const params = { email: userEmail };
    return this.httpClient.get<ApiResponseI<any>>(`${environment.urlLocalApi}/user/userByEmail`, { params: params });
  }

}

export interface UserRequest {
  userName: string,
  userPassword: string
}
