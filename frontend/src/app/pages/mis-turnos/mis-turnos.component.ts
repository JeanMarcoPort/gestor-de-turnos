import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TurnosService } from '../../services/turnos.service';
import { HorariosService } from '../../services/horarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  turnos: any[] = [];
  horariosDisponibles: any[] = [];
  esAdmin: boolean = false; //false porque no es admin por defecto

  // Variables para mostrar/ocultar formularios
  mostrarFormularioHorario: boolean = false;
  mostrarTurnos: boolean = true;
  mostrarHorarios: boolean = false;

  // trackBy para *ngFor
  trackByTurnoId(index: number, turno: any): number {
    return turno.id;
  }
  
  // Objeto para el formulario de nuevo horario
  nuevoHorario: any = {
    fecha: '',
    hora_inicio: '',
    hora_fin: ''
  };

  // Mensajes de feedback
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    public authService: AuthService,
    private readonly turnosService: TurnosService,
    private readonly horariosService: HorariosService
  ) {}

  ngOnInit() {
    this.cargarDatos();
    this.esAdmin = String(this.authService.getUserRole()) === '1';
  }

  

cargarDatos() {
  this.turnosService.getTurnos().subscribe({
    next: (turnos) => {
      if (this.esAdmin) {
        this.turnos = turnos;
      } else {
        const userId = this.authService.getCurrentUserId();
        this.turnos = turnos.filter(turno => turno.user_id === userId);
      }
    },
    error: (err) => {
      console.error('Error cargando turnos:', err);
      this.mensajeError = 'Error al cargar los turnos';
    }
  });

  if (this.esAdmin) {
    const fechaHoy = new Date().toISOString().split('T')[0];
    this.horariosService.getHorariosDisponibles(fechaHoy).subscribe({
      next: (horarios) => {
        this.horariosDisponibles = horarios;
      },
      error: (err) => {
        console.error('Error cargando horarios:', err);
        this.mensajeError = 'Error al cargar los horarios disponibles';
      }
    });
  }
}


  cancelarTurno(id: number) {
    if (confirm('¿Estás seguro de cancelar este turno?')) {
      this.turnosService.cancelarTurno(id).subscribe({
        next: () => {
          this.cargarDatos();
          this.mensajeExito = 'Turno cancelado correctamente';
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (err) => {
          console.error('Error cancelando turno:', err);
          this.mensajeError = 'Error al cancelar el turno';
        }
      });
    }
  }

  agregarHorario() {
    // Validación básica
    if (!this.nuevoHorario.fecha || !this.nuevoHorario.hora_inicio || !this.nuevoHorario.hora_fin) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    // Convertir fecha a formato ISO (YYYY-MM-DD)
    const fechaISO = new Date(this.nuevoHorario.fecha).toISOString().split('T')[0];
    
    const horarioData = {
      fecha: fechaISO,
      hora_inicio: this.nuevoHorario.hora_inicio,
      hora_fin: this.nuevoHorario.hora_fin,
      business_id: this.authService.getCurrentUserId() // Asignar al negocio actual
    };

    this.horariosService.crearHorario(horarioData).subscribe({
      next: () => {
        this.mensajeExito = 'Horario agregado correctamente';
        this.mensajeError = '';
        this.nuevoHorario = { fecha: '', hora_inicio: '', hora_fin: '' }; // Reset form
        this.cargarDatos(); // Recargar lista
        setTimeout(() => this.mensajeExito = '', 3000);
      },
      error: (err: any) => {
        console.error('Error agregando horario:', err);
        this.mensajeError = err.error?.message ?? 'Error al agregar el horario';
      }
    });
  }
}