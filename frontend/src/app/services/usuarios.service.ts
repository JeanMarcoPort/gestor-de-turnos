import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cambiarRol(id: number, rol_id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/rol`, { rol_id });
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}