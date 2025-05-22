import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

/* --- AuthService --- */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private readonly TOKEN_KEY = 'token'; // Coincide con tu interceptor

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  // Login del usuario
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  // Registro de nuevo usuario
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { ...userData, rol_id: 2 });
  }

  // Guarda el token en localStorage
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Cierra la sesión eliminando el token
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // Verifica si existe un token
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Obtiene datos básicos del usuario desde el token
  getUserData(): { id: number; email: string; rol_id: number } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        rol_id: payload.rol_id
      };
    } catch (e) {
      console.error('Error parsing token', e);
      return null;
    }
  }

  // Métodos rápidos
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): number | null {
    return this.getUserData()?.id || null;
  }

  getUserRole(): 'admin' | 'user' {
    return this.getUserData()?.rol_id === 1 ? 'admin' : 'user';
  }
}

/* --- authInterceptor function --- */
import { inject } from '@angular/core';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};