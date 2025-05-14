import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdministrarHorariosComponent } from './pages/administrar-horarios/administrar-horarios.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReservarTurnoComponent } from './pages/reservar-turno/reservar-turno.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent, DashboardComponent, AdministrarHorariosComponent, ReservarTurnoComponent, MisTurnosComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor_de_turnos';
}
