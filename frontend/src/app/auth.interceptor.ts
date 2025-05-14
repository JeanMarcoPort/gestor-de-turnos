import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token desde localStorage
    const token = localStorage.getItem('token');

    // Si hay token, clonamos la petición y le agregamos el encabezado Authorization
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(authReq); // Continuar con la petición modificada
    }

    // Si no hay token, continuar con la petición original
    return next.handle(req);
  }
}

//El auth.interceptor.ts es un interceptor de HTTP en Angular que se encarga de agregar un token de autorización a las solicitudes HTTP.
// Este interceptor se utiliza para autenticar las solicitudes enviadas al servidor, asegurando que el token de autorización se incluya en el encabezado de la solicitud.