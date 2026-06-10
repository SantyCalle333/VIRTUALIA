import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Videojuego } from '../../models/videojuego';
import { VideojuegosService } from '../../services/videojuegos.service';

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './videojuegos.component.html',
  styleUrls: ['./videojuegos.component.css']
})
export class VideojuegosComponent implements OnInit {
  nuevoJuego: string = '';
  nuevotitulo: string = '';
  public titulo: string = 'Componente de Videojuegos';
  public listado: string = 'Listado de Videojuegos';

  // [DOC] Usamos un Observable (con sufijo $) en lugar de un arreglo estático.
  // ¿Por qué? Porque delegamos el manejo de la suscripción a Firebase directamente al HTML mediante el "Async Pipe".
  // Esto elimina la necesidad de manejar ngOnDestroy manualmente, evitando fugas de memoria (memory leaks).
  public videojuegos$: Observable<Videojuego[]> = new Observable();

  constructor(private videojuegosService: VideojuegosService) { 
    console.log('Componente Videojuegos creado');
  }
  
  ngOnInit() {
    console.log('Componente inicializado');
    // [DOC] Conectamos la variable al túnel de Firebase. 
    // No usamos .subscribe() aquí para evitar romper el ciclo de vida de Angular (Hydration bugs)
    this.videojuegos$ = this.videojuegosService.obtenerVideojuegos();
  }
  
  agregarJuego() {
    if (this.nuevoJuego.trim()) {
      const nuevoObj = new Videojuego(this.nuevoJuego.trim());
      this.videojuegosService.agregarVideojuego(nuevoObj);
      this.nuevoJuego = '';
    }
  }

  eliminarJuego(juego: Videojuego) {
    if (juego.id) {
      this.videojuegosService.eliminarVideojuego(juego.id);
    }
  }

  cambiarTitulo() {
    if (this.nuevotitulo.trim()) {
      this.titulo = this.nuevotitulo;
      console.log('Título cambiado a:', this.titulo);
      this.nuevotitulo = '';
    }
  }
}
