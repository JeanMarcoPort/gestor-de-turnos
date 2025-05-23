import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private readonly http: HttpClient) {}

  // Obtener horarios disponibles para una fecha
getAvailableSlots(date: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3000/api/horarios?fecha=${date}`);
}
  // Reservar un turno
  reserveAppointment(appointment: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/turnos', appointment);
  }
}