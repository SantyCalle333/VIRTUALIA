import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 'readonly' garantiza que la instancia de Auth no se reasigne por error (Mejora de SonarQube)
  private readonly auth: Auth = inject(Auth);
  
  // 'Injector' permite pasar el contexto de Angular a Firebase para evitar advertencias de consola
  private readonly injector = inject(Injector);
  
  // Observable para escuchar cambios en la sesión del usuario
  public currentUser$: Observable<User | null> = authState(this.auth);

  constructor() {}

  // Iniciar sesión con Correo y Contraseña
  loginWithEmail(email: string, pass: string) {
    // runInInjectionContext asegura que AngularFire mantenga el contexto del árbol de componentes de Angular
    return runInInjectionContext(this.injector, () => signInWithEmailAndPassword(this.auth, email, pass));
  }

  // Registrar nueva cuenta con Correo y Contraseña
  registerWithEmail(email: string, pass: string) {
    return runInInjectionContext(this.injector, () => createUserWithEmailAndPassword(this.auth, email, pass));
  }

  // Iniciar sesión (o Registrarse) con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return runInInjectionContext(this.injector, () => signInWithPopup(this.auth, provider));
  }

  // Cerrar Sesión
  logout() {
    return runInInjectionContext(this.injector, () => signOut(this.auth));
  }
}
