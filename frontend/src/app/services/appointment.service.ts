import { Injectable } from '@angular/core'; // Este servicio se encarga de realizar las peticiones HTTP al backend.
import { HttpClient } from '@angular/common/http'; // Se utiliza para obtener, crear, actualizar y eliminar datos en el backend.
import { Observable } from 'rxjs'; // Cada archivo en la carpeta services tiene como función encapsular la lógica de negocio relacionada con las peticiones HTTP para

@Injectable({
  providedIn: 'root'
})  // interactuar con el backend. Esto permite mantener el código más limpio y organizado.
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/appointments';

  constructor(private http: HttpClient) {}  // Además, facilita la reutilización del código y la separación de responsabilidades.

  //getbusinessshours es para obtener los horarios de atención de un negocio
  getBusinessHours(businessId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/business-hours/${businessId}`);
  }
//getAvailableSlots es para obtener los turnos disponibles de un negocio en una fecha determinada
  getAvailableSlots(businessId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available/${businessId}/${date}`);
  }
  //getAppointmentDetails es para obtener los detalles de un turno en particular
  getAppointmentDetails(appointmentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${appointmentId}`);
  }
  //reserveAppointment es para reservar un turno
  reserveAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appointment);
  }
  //cancelAppointment es para cancelar un turno
  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/appointments/${appointmentId}`);
  }
  //updateAppointment es para actualizar un turno
  updateAppointment(appointmentId: number, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${appointmentId}`, appointment);
  }

  // Para negocios:
  addBusinessHour(day: string, start: string, end: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/business-hours`, { day, start, end });
  }
}