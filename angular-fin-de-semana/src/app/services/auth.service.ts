import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  // Observable para escuchar cambios en la sesión del usuario
  public currentUser$: Observable<User | null> = authState(this.auth);

  constructor() {}

  // Iniciar sesión con Correo y Contraseña
  loginWithEmail(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Registrar nueva cuenta con Correo y Contraseña
  registerWithEmail(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Iniciar sesión (o Registrarse) con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Cerrar Sesión
  logout() {
    return signOut(this.auth);
  }
}
