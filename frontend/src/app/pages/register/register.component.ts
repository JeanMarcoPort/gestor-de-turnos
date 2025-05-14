import { Component } from '@angular/core'; // Importamos Component para definir el componente
import { Router } from '@angular/router'; // Importamos Router para redirigir después del registro
import { AuthService } from '../../services/auth.service'; // Importamos el servicio de autenticación
import { FormsModule } from '@angular/forms'; // Importamos FormsModule para usar ngModel
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar *ngIf

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // Marcamos como readonly porque no se reasignan dentro del constructor
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  // Envía los datos del formulario al servicio de autenticación para registrar al usuario
  onSubmit() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: () => {
        // Si se registra correctamente, lo redirigimos al login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Mostramos un mensaje de error si la creación falla
        this.errorMessage = err.error?.message ?? 'No se pudo crear el usuario';
      }
    });
  }
}
