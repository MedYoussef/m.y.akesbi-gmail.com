import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // exhaustMap permet d'attendre le retour du user avant de retourner la requete modifié
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      // l'ajout du token ne doit pas s'appliquer sur la requete http d'authentification sinon elle passera jamais
      if(!user){
        return next.handle(req);
      }
      // Ajouter un Token a la requete Http sous forme de query params
      const modifiedReq = req.clone({params : new HttpParams().set('auth', user.token)});
      return next.handle(modifiedReq);
    }))
    
  }
}
