import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiErrors } from '../../../types/errors';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected errors:ApiErrors;
  private router = inject(Router);
  private location = inject(Location);
  protected showDetails =false;

  constructor(){
    const navigation = this.router.currentNavigation();
    this.errors = navigation?.extras.state?.['error'];
  }

  showDetailToggle(){
    this.showDetails = !this.showDetails;
  }

  GoBack(){
    this.location.back();
  }
}
