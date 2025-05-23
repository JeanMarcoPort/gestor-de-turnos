import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservarTurnoComponent } from './pages/reservar-turno/reservar-turno.component';
import { AdministrarHorariosComponent } from './pages/administrar-horarios/administrar-horarios.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a la página de inicio (dashboard) por defecto

  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas con el guard
  // Si no está autenticado, lo redirige a la página de login
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'administrar-horarios', component: AdministrarHorariosComponent, canActivate: [AuthGuard, AdminGuard] },
  {path: 'admin-usuarios', component: AdminUsuariosComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'reservar-turno', component: ReservarTurnoComponent, canActivate: [AuthGuard] },
  { path: 'mis-turnos', component: MisTurnosComponent, canActivate: [AuthGuard] },

  // Ruta comodín para redirigir a la página de inicio si la ruta no existe
  { path: '**', redirectTo: '/dashboard' }
];