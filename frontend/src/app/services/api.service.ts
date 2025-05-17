import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:3000/api'; // Ajustar si el backend cambia

  constructor(private http: HttpClient) {}

  /**
   * Realiza una petición GET.
   */
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${endpoint}`);
  }

  /**
   * Realiza una petición POST.
   */
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${endpoint}`, data);
  }

  /**
   * Realiza una petición PUT.
   */
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${endpoint}`, data);
  }

  /**
   * Realiza una petición DELETE.
   */
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${endpoint}`);
  }
}
// Este servicio se encarga de realizar las peticiones HTTP al backend.
// Se utiliza para obtener, crear, actualizar y eliminar datos en el backend.
//Cada archivo en la carpeta services tiene como función encapsular la lógica de negocio relacionada con las peticiones HTTP para
// interactuar con el backend. Esto permite mantener el código más limpio y organizado.
// Además, facilita la reutilización del código y la separación de responsabilidades.