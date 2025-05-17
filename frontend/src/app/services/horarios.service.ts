import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HorariosService {
  private readonly API_URL = 'http://localhost:3000/api/horarios';

  constructor(private readonly http: HttpClient) {}

  getHorariosDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/disponibles`);
  }
  crearHorario(horario: any): Observable<any> {
    return this.http.post(`${this.API_URL}/crear`, horario);
  }
  actualizarHorario(id: number, horario: any): Observable<any> {
    return this.http.put(`${this.API_URL}/actualizar/${id}`, horario);
  }
  eliminarHorario(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }
  obtenerHorarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/horario/${id}`);
  }
  obtenerHorariosPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/usuario/${usuarioId}`);
  }
}