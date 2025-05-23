import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-reservar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar-turno.component.html',
  styleUrls: ['./reservar-turno.component.css']
})
export class ReservarTurnoComponent {
  availableSlots: any[] = [];
  selectedDate!: string;
  today: string = new Date().toISOString().split('T')[0];
  successMessage: string = '';
  errorMessage: string = '';
  busquedaRealizada: boolean = false;

  constructor(private readonly appointmentService: AppointmentService) {}

  // Método para cargar los horarios disponibles
  loadAvailableSlots() {
    this.busquedaRealizada = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.availableSlots = [];
    if (!this.selectedDate) {
      this.errorMessage = 'Selecciona una fecha válida.';
      return;
    }
    this.appointmentService.getAvailableSlots(this.selectedDate).subscribe({
      next: (slots) => {
        this.availableSlots = slots;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar horarios disponibles';
        this.availableSlots = [];
      }
    });
  }

  // Método para reservar un turno específico
  reserveSlot(slot: any) {
    if (!confirm(`¿Confirmas reservar el turno para ${slot.fecha} a las ${slot.hora_inicio}?`)) {
      return; // Si el user cancela, no hacemos nada
    }
    const appointment = {
      horario_id: slot.id_horario,
      motivo: ''
    };

    // Limpiamos mensajes previos
    this.appointmentService.reserveAppointment(appointment).subscribe({
      next: () => {
        this.successMessage = '✅ Turno reservado con éxito!';
        this.errorMessage = '';
        this.busquedaRealizada = false;
        this.availableSlots = [];
        setTimeout(() => this.successMessage = '', 4000);// Oculta el mensaje después de 4 segundos
      },
      error: (err) => {
        this.errorMessage = '❌ Error al reservar: ' + (err.error?.message ?? 'Intenta nuevamente');
        this.successMessage = '';
      }
    });
  }
}