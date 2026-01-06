import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layouts/nav/nav";
import { AccountService } from '../core/services/account-service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private accountService = inject(AccountService);
  protected readonly title = signal('client');


  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
