import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})

// Este componente es responsable de la administración de usuarios en la aplicación.
export class AdminUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario = { name: '', email: '', password: '', rol_id: 2 };
  editando: any = null;

  constructor(private readonly usuariosService: UsuariosService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }
  
  onRolChange(event: Event, usuario: any) {
  const value = +(event.target as HTMLSelectElement).value;
  this.cambiarRol(usuario, value);
}

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error(err)
    });
  }

  cambiarRol(usuario: any, nuevoRol: number) {
    this.usuariosService.cambiarRol(usuario.id, nuevoRol).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => console.error(err)
    });
  }

  crearUsuario() {
    this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.nuevoUsuario = { name: '', email: '', password: '', rol_id: 2 };
      },
      error: (err) => console.error(err)
    });
  }

  editarUsuario(usuario: any) {
    this.editando = { ...usuario };
  }

  guardarEdicion() {
    this.usuariosService.editarUsuario(this.editando.id, this.editando).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.editando = null;
      },
      error: (err) => console.error(err)
    });
  }

  cancelarEdicion() {
    this.editando = null;
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => console.error(err)
      });
    }
  }
}