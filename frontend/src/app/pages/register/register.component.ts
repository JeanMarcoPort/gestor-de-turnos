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
  successMessage: string = ''; // Mensaje de éxito al registrar
  showSuccess: boolean = false; //Controla la visibilidad del mensaje de éxito

  // Marcamos como readonly porque no se reasignan dentro del constructor
  constructor(private readonly authService: AuthService, public readonly router: Router) {}

  // Envía los datos del formulario al servicio de autenticación para registrar al usuario
  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.showSuccess = false;

    this.authService.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.successMessage = '¡Cuenta creada exitosamente! Redirigiendo al login...';
          this.showSuccess = true;
          
          // Oculta el mensaje después de 3 segundos y redirige
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message ?? 'Error al crear la cuenta';
        }
      });
  }
}
