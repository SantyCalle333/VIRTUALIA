import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  users$ = this.http.get<User[]>('/api/users');
}