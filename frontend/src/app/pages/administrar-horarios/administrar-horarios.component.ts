import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrar-horarios',
  templateUrl: './administrar-horarios.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./administrar-horarios.component.css'],
})
export class AdministrarHorariosComponent implements OnInit {
  successMessage: string = '';
  horarios: any[] = [];
  nuevoHorario = {
    fecha: '',
    hora_inicio: '',
    hora_fin: ''
  };

  constructor(
    private readonly horariosService: HorariosService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarHorarios();
  }

  cargarHorarios() {
    this.horariosService.getTodosHorariosDisponibles().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error(err)
    });
  }

  crearHorario() {
    this.horariosService.crearHorario(this.nuevoHorario).subscribe({
      next: () => {
        this.cargarHorarios();
        this.nuevoHorario = { fecha: '', hora_inicio: '', hora_fin: '' };
      },
      error: (err) => console.error(err)
    });
  }

  eliminarHorario(id: number) {
    this.horariosService.eliminarHorario(id).subscribe({
      next: () => this.cargarHorarios(),
      error: (err: any) => console.error(err)
    });
  }
}