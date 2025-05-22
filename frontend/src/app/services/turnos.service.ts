import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnosService {
 getTurnos(): Observable<any[]> {
  return this.api.get<any[]>('turnos');
}

  constructor(private readonly api: ApiService) {}

  reservarTurno(turnoData: { id_horario: number; motivo?: string }): Observable<any> {
    return this.api.post('turnos', turnoData);
  }

  getTurnosUsuario(): Observable<any[]> {
    return this.api.get<any[]>('turnos');
  }

  cambiarEstado(id_turno: number, estado: string): Observable<any> {
    return this.api.put(`turnos/${id_turno}/estado`, { estado });
  }

  cancelarTurno(id_turno: number): Observable<any> {
    return this.api.delete(`turnos/${id_turno}`);
  }
}