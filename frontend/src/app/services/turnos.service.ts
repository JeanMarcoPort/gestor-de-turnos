import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnosService {
  private readonly apiUrl = 'http://localhost:3000/api/turnos';

  constructor(private readonly http: HttpClient) {}

  getTurnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cambiarEstado(turnoId: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${turnoId}/estado`, { estado });
  }

  cancelarTurno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Crear comentario 
  cambiarComentario(id: number, comentario: string) {
  return this.http.patch(`${this.apiUrl}/${id}/comentario`, { comentario_admin: comentario });
}
}