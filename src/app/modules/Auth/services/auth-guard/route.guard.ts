import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { LocalServiceService } from 'src/app/api/services/localStorage/local-service.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(public router: Router,private local: LocalServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.local.getItem('accessToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['auth/signIn']);
      return false;
    }
  }
}
