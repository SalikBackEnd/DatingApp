import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
private http = inject(HttpClient);
private baseUrl = 'https://localhost:5001/api/';
protected validationerror = signal<string[]>([]);

get500Error(){
  this.http.get(this.baseUrl+'buggy/server-error').subscribe({
    next: (res)=>console.log(res),
    error: error=>console.log(error)
  })
}
get401Error(){
  this.http.get(this.baseUrl+'buggy/auth').subscribe({
    next: (res)=>console.log(res),
    error: error=>console.log(error)
  })
}
get400Error(){
  this.http.get(this.baseUrl+'buggy/bad-request').subscribe({
    next: (res)=>console.log(res),
    error: error=>console.log(error)
  })
}
get400ValidationError(){
  this.http.post(this.baseUrl+'account/register',{}).subscribe({
    next: (res)=>console.log(res),
    error: error=>{console.log(error);
      this.validationerror.set(error);
    }
  })
}
get404Error(){
  this.http.get(this.baseUrl+'buggy/not-found').subscribe({
    next: (res)=>console.log(res),
    error: error=>console.log(error)
  })
}

}
