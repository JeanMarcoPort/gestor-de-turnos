import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservarTurnoComponent } from './pages/reservar-turno/reservar-turno.component';
import { AdministrarHorariosComponent } from './pages/administrar-horarios/administrar-horarios.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas con el guard
  //Authguard es un guard que protege las rutas y verifica si el usuario está autenticado
  // Si no está autenticado, lo redirige a la página de login
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
  { path: 'reservar-turno', component: ReservarTurnoComponent, canActivate: [AuthGuard] },
  { path: 'administrar-horarios', component: AdministrarHorariosComponent, canActivate: [AuthGuard] },
  { path: 'mis-turnos', component: MisTurnosComponent, canActivate: [AuthGuard] },

  // Ruta comodín para redirigir a la página de inicio si la ruta no existe
  { path: '**', redirectTo: '/dashboard' }
];