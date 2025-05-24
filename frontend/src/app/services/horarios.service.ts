import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HorariosService {
  eliminarHorario(id: number): Observable<any> {
  return this.api.delete(`horarios/${id}`);
}

  constructor(private readonly api: ApiService) {}

  getHorariosDisponibles(fecha: string): Observable<any[]> {
    return this.api.get<any[]>(`horarios?fecha=${fecha}`);
  }

  //Para obtener todos los horarios disponibles
  getTodosHorariosDisponibles(): Observable<any[]> {
  return this.api.get<any[]>(`horarios/disponibles`);
}

  crearHorario(horarioData: { fecha: string; hora_inicio: string; hora_fin: string }): Observable<any> {
    return this.api.post('horarios', horarioData);
  }

  getHorariosNegocio(): Observable<any[]> {
    return this.api.get<any[]>('horarios/negocio');
  }

  actualizarDisponibilidad(id_horario: number, disponible: boolean): Observable<any> {
    return this.api.put(`horarios/${id_horario}/disponibilidad`, { disponible });
  }
}