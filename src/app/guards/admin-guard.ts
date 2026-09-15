import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user-service';

export const adminGuard: CanActivateFn = async () => {

  const userService = inject(UserService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Si Angular está ejecutando el Guard en el servidor,
  // dejamos que continúe. Firebase se comprobará en el navegador.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Si ya sabemos que es administrador
  if (userService.UsuarioLogueado?.rol === 'admin') {
    return true;
  }

  // Recuperar la sesión guardada por Firebase
  const usuario = await userService.restaurarSesionFirebase();

  if (usuario?.rol === 'admin') {
    return true;
  }

  router.navigate(['/Ingresar']);
  return false;
};