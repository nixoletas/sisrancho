import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<any> {
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      // Redirect to the dashboard or another appropriate page
      this.router.navigate(['/dashboard']);
      return false; // Prevent navigation to the login page
    }
    return true; // Allow navigation
  }

  constructor(private authService: AuthService, private router: Router) {}
}