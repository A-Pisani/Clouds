import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class SecurePagesGuard implements CanActivate {
  constructor(public newsService: NewsService, public router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.newsService.userSignedIn()){
        this.router.navigate(["news"]);
      }
      return true;
  }


}
