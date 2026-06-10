import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Escuchamos el estado del usuario.
  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      // Si el usuario existe, permitimos el acceso devolviendo true.
      if (user) {
        return true;
      } else {
        // Si no hay usuario, redirigimos al login.
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
