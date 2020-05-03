import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponse } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  logindMode : boolean = true;
  authForm : FormGroup;
  isLoading : boolean = false;
  error : string = null;
  signedUp : boolean = false;
  authObs : Observable<AuthResponse>;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }


  OnSwitchMode(){
    this.logindMode = !this.logindMode;
  }

  OnSubmit(){
    // auth
    this.isLoading = true;
    const userEmail = this.authForm.value['email'];
    const userPassword = this.authForm.value['password'];
    if(this.logindMode) {
      this.authService.LogIn(userEmail, userPassword).subscribe(res => {
        this.isLoading = !this.isLoading;
        console.log(res);
        this.router.navigate(['/recipes']);
        console.log('routage');
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = !this.isLoading;
      });
    }
    else{
      this.authService.SignUp(userEmail, userPassword).subscribe(res => {
        this.isLoading = !this.isLoading;
        this.signedUp = true;
        setTimeout(() => this.signedUp = false, 1000);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = !this.isLoading;
      });
      
      this.authForm.reset();
    }
  }

}
