import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  pass: string = '';
  errorMessage: string = '';
  isRegistering: boolean = false; // Estado para alternar entre Login y Registro

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }

  async submitForm() {
    this.errorMessage = '';
    try {
      if (this.isRegistering) {
        await this.authService.registerWithEmail(this.email, this.pass);
      } else {
        await this.authService.loginWithEmail(this.email, this.pass);
      }
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      if (this.isRegistering) {
        this.errorMessage = 'Error al crear la cuenta. La contraseña debe tener al menos 6 caracteres o el correo ya existe.';
      } else {
        this.errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña.';
      }
      console.error(error);
    }
  }

  async loginConGoogle() {
    this.errorMessage = '';
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = 'Error al iniciar sesión con Google.';
      console.error(error);
    }
  }
}
