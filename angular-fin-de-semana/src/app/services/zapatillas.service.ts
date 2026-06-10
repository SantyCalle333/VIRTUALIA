import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Database, ref, listVal, push, remove } from '@angular/fire/database';
import { setLogLevel, LogLevel } from '@angular/fire';
import { Zapatilla } from '../models/zapatilla';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZapatillasService {
  private db: Database = inject(Database);
  private injector: Injector = inject(Injector);
  private zapatillas$: Observable<Zapatilla[]>;

  constructor() {
    // Silenciamos las advertencias seguras de AngularFire
    setLogLevel(LogLevel.SILENT);
    
    // Definir la conexión en el constructor garantiza el "Injection Context" de Angular
    const dbRef = ref(this.db, 'zapatillas');
    this.zapatillas$ = listVal<Zapatilla>(dbRef, { keyField: 'id' });
  }

  // Obtener todas las zapatillas (Túnel WebSocket en vivo)
  obtenerZapatillas(): Observable<Zapatilla[]> {
    return this.zapatillas$;
  }

  // Guardar una nueva zapatilla
  agregarZapatilla(zapatilla: Zapatilla) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, 'zapatillas');
      const zapa = JSON.parse(JSON.stringify(zapatilla));
      delete zapa.id; // Firebase no permite propiedades 'undefined'
      return push(dbRef, zapa);
    });
  }

  // Eliminar una zapatilla
  eliminarZapatilla(id: string) {
    return runInInjectionContext(this.injector, () => {
      const dbRef = ref(this.db, `zapatillas/${id}`);
      return remove(dbRef);
    });
  }
}
