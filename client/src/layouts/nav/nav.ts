import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginDto } from '../../types/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  protected cred:LoginDto = {email:'',password:''};

  login(){
    this.accountService.login(this.cred).subscribe({
      next: (response) => {
        this.accountService.currentUser.set(response);
        this.cred = {email:'',password:''};
        this.router.navigateByUrl('/members');
      },
      error: err => alert(err.message),
      complete: ()=> console.log('Completed the login request')
    });
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }
}
