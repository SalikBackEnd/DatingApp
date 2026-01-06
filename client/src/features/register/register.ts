import { Component, inject, output } from '@angular/core';
import { RegisterCred } from '../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private acountService = inject(AccountService);
  protected cancelRegister = output<boolean>();
  protected cred = {} as RegisterCred;

  onRegister(){
    this.acountService.register(this.cred).subscribe(
      {
        next: res=>{
          console.log(res);
          this.onCancel();
        },
        error: error=>console.log(error)
      }
    );
  }

  onCancel(){
    this.cancelRegister.emit(false);
  }

}
