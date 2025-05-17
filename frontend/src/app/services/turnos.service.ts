import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnosService {
  private readonly API_URL = 'http://localhost:3000/turnos';

  constructor(private readonly http: HttpClient) {}

  getTurnos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL); // Asegúrate de proteger esta ruta en el backend
  }

  cambiarEstadoTurno(id: number, nuevoEstado: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}`, { estado: nuevoEstado });
  }

  cancelarTurno(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  agregarTurno(turno: any): Observable<any> {
    return this.http.post(this.API_URL, turno);
  }
  actualizarTurno(id: number, turno: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, turno);
  }
  getTurnoPorId(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  } 
  getTurnosPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/usuario/${usuarioId}`);
  }
  
}