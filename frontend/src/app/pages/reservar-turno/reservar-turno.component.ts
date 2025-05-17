import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa módulos necesarios para directivas como *ngIf y ngModel
  templateUrl: './reservar-turno.component.html',
  styleUrls: ['./reservar-turno.component.css']
})
export class ReservarTurnoComponent {
  // Propiedades del componente:
  
  // Almacena los horarios disponibles que vienen del servidor
  availableSlots: any[] = []; 
  
  // Guarda la fecha seleccionada por el usuario (el ! indica que se inicializará después)
  selectedDate!: string; 
  
  // ID del negocio (podría venir de un servicio o parámetro de ruta)
  businessId: number = 1; 
  
  // Fecha actual en formato YYYY-MM-DD para el atributo [min] del input date
  today: string = new Date().toISOString().split('T')[0]; 
  
  // Mensaje que se muestra cuando una reserva es exitosa
  successMessage: string = '';
  
  // Mensaje que se muestra cuando ocurre un error
  errorMessage: string = '';

  // Inyectamos el servicio para gestionar turnos
  constructor(private readonly appointmentService: AppointmentService) {}

  // Método para cargar horarios disponibles
  loadAvailableSlots() {
    // Validación básica: si no hay fecha seleccionada
    if (!this.selectedDate) {
      this.errorMessage = 'Selecciona una fecha primero';
      return; // Salimos del método
    }
    
    // Llamada al servicio para obtener horarios
    this.appointmentService.getAvailableSlots(
      this.businessId, 
      this.selectedDate
    ).subscribe({
      next: (slots) => {
        // Si éxito, actualizamos la lista y limpiamos errores
        this.availableSlots = slots;
        this.errorMessage = '';
      },
      error: (err) => {
        // Si error, mostramos mensaje
        this.errorMessage = 'Error al cargar horarios: ' + (err.error?.message || '');
        console.error('Error detallado:', err);
      }
    });
  }
  
  // Método para reservar un turno específico
  reserveSlot(slot: any) {
    if (!confirm(`¿Confirmas reservar el turno para ${slot.fecha} a las ${slot.hora_inicio}?`)) {
      return; // Si el usuario cancela, no hacemos nada
    }
    
    this.appointmentService.reserveAppointment(slot).subscribe({
      next: () => {
        // Si éxito:
        this.successMessage = '✅ Turno reservado con éxito!';
        
        // Actualizamos la lista de horarios disponibles
        this.loadAvailableSlots(); 
        
        // Limpiamos el mensaje después de 5 segundos
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (err) => {
        // Si error:
        this.errorMessage = '❌ Error al reservar: ' + (err.error?.message ?? 'Intenta nuevamente');
        console.error('Error detallado:', err);
      }
    });
  }
}