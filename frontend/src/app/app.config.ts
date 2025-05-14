import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // Para la detección de cambios en Angular
import { provideRouter } from '@angular/router'; // Para la configuración de las rutas en Angular

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'; // Para la configuración del cliente HTTP e interceptores en Angular
import { AuthInterceptor } from './auth.interceptor'; // Para la configuración del interceptor de autenticación


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true }
  ]
};

//app.config.ts es un archivo de configuración de la aplicación Angular que define los proveedores y la configuración de las rutas.
// La función provideRouter se utiliza para configurar las rutas de la aplicación.