import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal, push, remove } from '@angular/fire/database';
import { setLogLevel, LogLevel } from '@angular/fire';
import { Curso } from '../models/curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private db: Database = inject(Database);
  private injector: Injector = inject(Injector);         //pasaporte de Angular
  private cursos$: Observable<Curso[]>;

  constructor() {
    setLogLevel(LogLevel.SILENT);
    const dbRef = ref(this.db, 'cursos');
    this.cursos$ = listVal<Curso>(dbRef, { keyField: 'id' });
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$;
  }

  agregarCurso(curso: Curso) {
    return runInInjectionContext(this.injector, () => {            //usado aqui el pasaporte
      const dbRef = ref(this.db, 'cursos');
      const data = JSON.parse(JSON.stringify(curso));
      delete data.id; // Firebase no permite propiedades 'undefined'
      return push(dbRef, data);                                    //Envuelve la llamada a Firebase (push o remove) en una burbuja de "contexto oficial"
    });
  }

  eliminarCurso(id: string) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, `cursos/${id}`);
      return remove(dbRef);
    });
  }
}
