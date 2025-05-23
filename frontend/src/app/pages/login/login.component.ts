import { Component } from '@angular/core';  // Importamos Component para crear el componente
import { Router } from '@angular/router'; // Importamos Router para redirigir después de iniciar sesión
import { AuthService } from '../../services/auth.service'; // Importamos el servicio de autenticación
import { FormsModule } from '@angular/forms'; // Importamos FormsModule para usar ngModel en el formulario
import { CommonModule } from '@angular/common'; // Importamos el módulo común para usar ngIf y ngFor

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  standalone: true, // Indicamos que este componente es independiente
  // Se puede usar en cualquier lugar sin necesidad de declararlo en un módulo
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  //Añadir readonly si no se va a modificar la propiedad dentro del constructor
  constructor(private readonly authService: AuthService, public readonly router: Router) {}

  // Envía los datos del formulario al servicio de autenticación
  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({ // Suscribimos al observable para recibir la respuesta
      // Si la respuesta es exitosa, guardamos el token y redirigimos
      next: (res) => { //next es para manejar la respuesta exitosa
        // Guardamos el token y redirigimos al dashboard
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']); // Redirigimos al dashboard
      },
      error: (err) => {
        // Mostramos un mensaje si las credenciales son incorrectas
        this.errorMessage = err.error?.message ?? 'Correo o contraseña incorrectos';
      }
    });
  }
}
