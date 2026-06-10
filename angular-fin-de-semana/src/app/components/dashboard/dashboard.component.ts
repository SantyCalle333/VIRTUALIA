import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideojuegosComponent } from '../videojuegos/videojuegos.component';  
import { ZapatillasComponent } from '../zapatillas/zapatillas.component';
import { Cursos } from "../cursos/cursos.component";
import { Configuracion } from '../../models/configuracion';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, VideojuegosComponent, ZapatillasComponent, Cursos],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombreProyecto: string = Configuracion.titulo;
  descripcionProyecto: string = Configuracion.descripcion;
  color: string = Configuracion.color;
  fondo: string = Configuracion.fondo;
  alumno: string = 'Black Sabbath';
  public ocultar_videojuegos: boolean = false;

  constructor(private authService: AuthService, private router: Router) { 
    console.log('Componente Dashboard creado');
  }

  ngOnInit() {
    console.log('Dashboard inicializado');
  }

  ocultarVideojuegos(value: boolean) {
    this.ocultar_videojuegos = value;
  }

  mostrarVideojuegos(value: boolean) {
    this.ocultar_videojuegos = value;
  }

  // Convertimos a 'async' para obligar a la app a esperar a que Firebase termine el proceso de logout
  async cerrarSesion() {
    await this.authService.logout(); // await evita que el router navegue mientras la sesión aún existe
    console.clear(); // Limpiamos la consola para destruir el historial visual de los datos de sesión (UX y Seguridad)
    this.router.navigate(['/login']);
  }
}
