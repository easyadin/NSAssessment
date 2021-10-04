import { FacebookService } from './../services/facebook.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookGuard implements CanActivate {
  constructor(private fbService: FacebookService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fbService.getCurrentToken().then(res => {
      if (res) return true;
      else return this.router.navigateByUrl('/login')
    });
  }
}

