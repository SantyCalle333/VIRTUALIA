import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Curso } from '../models/curso';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css',
})
export class Cursos implements OnInit {
  nuevoCurso: string = '';
  titulo: string = 'Componente de Cursos';
  listado: string = 'Listado de Cursos';
  
  // [DOC] Observable que mantiene un canal de comunicación en vivo con Firebase.
  // Evitamos usar arreglos clásicos (Curso[]) porque Firebase es asíncrono y los arreglos causan desfases.
  // La destrucción de este canal se delega al HTML usando el Async Pipe, por lo que NO necesitamos ngOnDestroy.
  public cursos$: Observable<Curso[]> = new Observable();
  
  constructor(private cursosService: CursosService) { 
    console.log('Componente Cursos creado');
  }

  ngOnInit() {
    console.log('Componente inicializado');
    // [DOC] Enganchamos el Observable local al Observable del Servicio (Firebase).
    // Nota: ¡No hay un .subscribe() aquí! Dejar que el HTML se suscriba previene múltiples errores.
    this.cursos$ = this.cursosService.obtenerCursos();
  }


  agregarCurso() {
    if (this.nuevoCurso.trim()) {
      const nuevoObj = new Curso(this.nuevoCurso.trim());
      this.cursosService.agregarCurso(nuevoObj);
      this.nuevoCurso = '';
    }
  }

  eliminarCurso(curso: Curso) {
    if (curso.id) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }
}