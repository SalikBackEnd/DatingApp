import { Component } from '@angular/core';
import { RegisterCred } from '../../types/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected cred:RegisterCred = {
    email:'',
    displayName:'',
    password:''
  };

  onRegister(){

  }


}
