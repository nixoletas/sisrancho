import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<any> {
  
  constructor(private authService: AuthService, private router: Router) {}

  canDeactivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']); // Redireciona para a página de login se não estiver autenticado
      return false;
    }
  }

}