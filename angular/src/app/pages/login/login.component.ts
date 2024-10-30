import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'br-login',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  cpf: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.cpf, this.password).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido', response);
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        }) // Redireciona para a página protegida
      },
      error: (error) => {
        console.error('Erro de login', error);
        alert('Erro de login! Verifique suas credenciais.');
      }
    });
  }

}
