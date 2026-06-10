import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal, push, remove } from '@angular/fire/database';
import { setLogLevel, LogLevel } from '@angular/fire';
import { Videojuego } from '../models/videojuego';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {
  private db: Database = inject(Database);
  private injector: Injector = inject(Injector);
  private videojuegos$: Observable<Videojuego[]>;

  constructor() {
    setLogLevel(LogLevel.SILENT);
    const dbRef = ref(this.db, 'videojuegos');
    this.videojuegos$ = listVal<Videojuego>(dbRef, { keyField: 'id' });
  }

  obtenerVideojuegos(): Observable<Videojuego[]> {
    return this.videojuegos$;
  }

  agregarVideojuego(juego: Videojuego) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, 'videojuegos');
      const data = JSON.parse(JSON.stringify(juego));
      delete data.id; // Firebase no permite propiedades 'undefined'
      return push(dbRef, data);
    });
  }

  eliminarVideojuego(id: string) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, `videojuegos/${id}`);
      return remove(dbRef);
    });
  }
}
