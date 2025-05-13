import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// El guard AuthGuard implementa la interfaz CanActivate, que permite proteger rutas en Angular
@Injectable({
  providedIn: 'root'
})
// AuthGuard es un guard que protege las rutas y verifica si el usuario está autenticado
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  // Método canActivate que se ejecuta antes de activar la ruta
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    // Verifica si el token existe en el almacenamiento local
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
