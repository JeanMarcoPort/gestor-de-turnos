import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Extrae el payload del token
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      console.error('Error parsing token payload', e);
      return null;
    }
  }
  
  // Login (el backend debe devolver { token: string })
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  // Registro
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { ...userData, rol_id: 2 });
  }

  // Guardar token
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // Verificar autenticación (solo chequea existencia del token)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Obtener datos del usuario desde el token
  getUserData(): { id: number; email: string; rol_id: number } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Extrae el payload del token
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        rol_id: payload.rol_id
      };
    } catch (e) {
      console.error('Error parsing token payload', e);
      return null;
    }
  }

  // Métodos convenientes
  getUserId(): number | null {
    return this.getUserData()?.id ?? null;
  }

  getUserRole(): number {
    return this.getUserData()?.rol_id ?? 2; // Default to user role
  }

  // Método para verificar si el usuario es admin
  esAdmin(): boolean {
    return this.getUserRole() === 1; // Rol 1 es admin
  }
}