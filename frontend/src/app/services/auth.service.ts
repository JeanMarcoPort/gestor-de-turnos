import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Este servicio estará disponible en toda la aplicación
})
export class AuthService {

  private API_URL = 'http://localhost:3000'; // URL base del backend (ajusta según sea necesario)

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Envía una solicitud de login al backend con las credenciales del usuario.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials);
  }

  /**
   * Envía una solicitud para registrar un nuevo usuario.
   */
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, userData);
  }

  /**
   * Guarda el token JWT en localStorage.
   */
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Obtiene el token JWT desde localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica si el usuario está logueado.
   * Retorna true si existe un token en localStorage.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Elimina el token y redirige al login (cierra sesión).
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
