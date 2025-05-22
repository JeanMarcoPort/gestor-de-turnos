import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService, private readonly router: Router) { }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login(){ 
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register']);
  }

  administrarHorarios(){
    this.router.navigate(['/administrar-horarios']);
  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }
  
  reservarTurno(){
    this.router.navigate(['/reservar-turno']);
  }

  misTurnos(){
    this.router.navigate(['/mis-turnos']);
  }
  
}