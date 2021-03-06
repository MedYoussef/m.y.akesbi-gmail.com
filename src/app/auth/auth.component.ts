import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponse } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    this.logInSub.unsubscribe();
  }

  sub : Subscription;
  logInSub : Subscription;
  logindMode : boolean = true;
  authForm : FormGroup;
  isLoading : boolean = false;
  error : string = null;
  signedUp : boolean = false;
  authObs : Observable<AuthResponse>;
  @ViewChild(PlaceholderDirective, {static : false} ) alertHost : PlaceholderDirective;
  constructor(private authService : AuthService, private router : Router, private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  HandleError(){
    this.error = null;
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
      this.logInSub = this.authService.LogIn(userEmail, userPassword).subscribe(res => {
        this.isLoading = !this.isLoading;
        console.log(res);
        this.router.navigate(['/recipes']);
        console.log('routage');
      }, errorMessage => {
        this.error = errorMessage;
        this.ShowError(errorMessage);
        this.isLoading = !this.isLoading;
      });
    }
    else{
      this.logInSub = this.authService.SignUp(userEmail, userPassword).subscribe(res => {
        this.isLoading = !this.isLoading;
        this.signedUp = true;
        setTimeout(() => this.signedUp = false, 1000);
      }, errorMessage => {
        this.error = errorMessage;
        this.ShowError(errorMessage);
        this.isLoading = !this.isLoading;
      });
      
      this.authForm.reset();
    }
  }

 // Creer un component de manière dynamique
   private ShowError(errorMessage : string){
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = errorMessage;
    this.sub = componentRef.instance.close.subscribe(()=>{
      //this.sub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
