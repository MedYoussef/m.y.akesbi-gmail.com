import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  idToken	: string //	A Firebase Auth ID token for the newly created user.
  email	 : string	// The email for the newly created user.
  refreshToken	: string // 	A Firebase Auth refresh token for the newly created user.
  expiresIn	: string //	The number of seconds in which the ID token expires.
  localId	 : string // The uid of the newly created user.
  registered? : boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http : HttpClient, private router : Router) { }

  errorMessage = 'An Error Occured';
  private tokenExpirationTimer : any = null;
  user = new BehaviorSubject<User>(null);


  private AuthenticationHandler(resData : AuthResponse){
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000 );
    const user = new User(resData.localId, resData.email, resData.idToken, expirationDate);
    this.user.next(user);

    // Garder les informations de l'utilisateur connecté dans localStorage
    localStorage.setItem('userData', JSON.stringify(user));

    // libérer le localstorage après une heure du logOut
    this.AutoLogOut(+resData.expiresIn * 1000);
  }


  private ErrorHandler(errorRes : HttpErrorResponse){
    if(!errorRes.error){
      return throwError(this.errorMessage);
    }
    else{
      this.errorMessage = errorRes.error.error.message;
    }
    return throwError(this.errorMessage);
  }

  AutoLogin(){
    const userData : {id : string, email : string, _token : string, _tokenExpirationDate } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return ;
    }
    else{
      const logedUser = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate));
      if(logedUser.token){
        this.user.next(logedUser);
        const expiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.AutoLogOut(expiration);
      }
    }
  }
  SignUp(email : string, password : string ){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey, 
    {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      catchError(errorRes => {
       return this.ErrorHandler(errorRes);
      })
    );
  }
  LogIn(email : string, password : string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseApiKey,
     {
      email : email,
      password : password,
      returnSecureToken:true
    }
    ).pipe(
      catchError(errorRes => {
        return this.ErrorHandler(errorRes);
      }), tap(resData =>{
        this.AuthenticationHandler(resData);
      })
    );
  }

  LogOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.clear();
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  AutoLogOut(expirationDuration : number){
    this.tokenExpirationTimer = setTimeout(() =>
      this.LogOut(), expirationDuration
    );
  }

}
