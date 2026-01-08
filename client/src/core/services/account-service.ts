import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginDto, RegisterCred, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser= signal<User|null>(null);
  private baseUrl = environment.apiUrl;

  register(cred:RegisterCred){
    return this.http.post<User>(this.baseUrl+'account/register',cred).pipe(
      tap(user =>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  login(cred:LoginDto){
    return this.http.post<User>(this.baseUrl+'account/login',cred)
    .pipe(
      tap(user =>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user:User){
     localStorage.setItem('user',JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
