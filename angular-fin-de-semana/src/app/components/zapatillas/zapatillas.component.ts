import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Zapatilla } from '../../models/zapatilla';
import { ZapatillasService } from '../../services/zapatillas.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-zapatillas-core',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './zapatillas.component.html',
	styleUrl: './zapatillas.component.css'
})
export class ZapatillasComponent implements OnInit {
	public titulo: string = 'Componente de Zapatillas';
	public listado: string = 'Listado de Zapatillas';
	
	// [DOC] Reemplazamos el arreglo estático por un Observable ($) de RxJS.
	// Esto nos permite leer datos de Firebase en tiempo real sin escribir callbacks confusos.
	// Además, al pasarlo al HTML mediante el AsyncPipe, evitamos crear "Memory Leaks" o bucles infinitos.
	public zapatillas$: Observable<Zapatilla[]> = new Observable();
	public marcas: string[] = [];
	public nuevoZapatilla: string = '';
	public mostrarSugerencias: boolean = false;
	public sugerencias: string[] = [];
	public catalogoZapatillas: Zapatilla[] = [
		new Zapatilla('Nike Air Max', 'Nike', 100, 'Negro', true),
		new Zapatilla('Adidas Superstar', 'Adidas', 290, 'Blanco', true),
		new Zapatilla('Reebok Classic', 'Reebok', 80, 'Blanco', true),
		new Zapatilla('Nike Runner MD', 'Nike', 40, 'Negro', true),
		new Zapatilla('Adidas Yeezy', 'Adidas', 100, 'Gris', true),
		new Zapatilla('Puma Suede', 'Puma', 60, 'Rojo', true),
		new Zapatilla('Vans Old Skool', 'Vans', 50, 'Negro', true)
	];

	constructor(private zapatillasService: ZapatillasService) {
		console.log('Componente Zapatillas creado');
	}

	ngOnInit() {
        console.log('Componente inicializado');
        this.zapatillas$ = this.zapatillasService.obtenerZapatillas();
		this.marcas = new Array();
		
		// Ejecutar automáticamente al cargar el componente
		this.getMarcas();
		this.imprimirJson();
    }
	
	// Métodos requeridos por tu HTML
	getMarcas() {
        // [DOC] El operador take(1) es CRÍTICO cuando nos suscribimos manualmente dentro de un botón.
        // Le indica a Angular: "Conéctate a Firebase, obtén los datos actuales, y CIERRA la suscripción de inmediato".
        // Si no usamos take(1), cada click al botón crearía una nueva conexión fantasma en segundo plano.
        this.zapatillas$.pipe(take(1)).subscribe(zapatillas => {
            this.marcas = [];
            zapatillas.forEach((zapatilla) => {
                if (this.marcas.indexOf(zapatilla.marca) < 0) {
                    this.marcas.push(zapatilla.marca);
                }
            });
            console.log('Marcas únicas en Firebase:', this.marcas);
        });
	}
	agregarZapatilla() {
		if (this.nuevoZapatilla.trim()) {
          const nombreBuscado = this.nuevoZapatilla.trim();
          const encontrada = this.catalogoZapatillas.find(z => z.nombre.toLowerCase() === nombreBuscado.toLowerCase());
          
          let nuevaZapa: Zapatilla;
          if (encontrada) {
             nuevaZapa = new Zapatilla(encontrada.nombre, encontrada.marca, encontrada.precio, encontrada.color, encontrada.stock);
          } else {
             nuevaZapa = new Zapatilla(nombreBuscado, 'Sin marca', 0, 'Sin color', true);
          }

		  // Firebase Realtime (WebSockets)
		  this.zapatillasService.agregarZapatilla(nuevaZapa);
		  // Ya no llamamos a cargarZapatillas() porque Firebase nos avisa automáticamente

	      this.nuevoZapatilla = '';
	    }
	}
	
	eliminarZapatilla(zapatillaAEliminar: Zapatilla) {
		// Si la zapatilla tiene un ID asignado por Firebase, la eliminamos de la nube
		if (zapatillaAEliminar.id) {
			this.zapatillasService.eliminarZapatilla(zapatillaAEliminar.id);
		}
	}

	imprimirJson() {
		this.zapatillas$.pipe(take(1)).subscribe(zapatillas => {
			console.log('JSON actual en Firebase:', JSON.stringify(zapatillas, null, 2));
		});
	}

	onInputChange() {
		const texto = this.nuevoZapatilla.trim().toLowerCase();
		if (texto.length > 0) {
			// Extraemos solo los nombres del catálogo para las sugerencias
			this.sugerencias = this.catalogoZapatillas
				.map(z => z.nombre)
				.filter(nombre => nombre.toLowerCase().includes(texto));
			this.mostrarSugerencias = this.sugerencias.length > 0;
		} else {
			this.sugerencias = [];
			this.mostrarSugerencias = false;
		}
	}

	onKeyDown(event: any) {
		if (event.key === 'Tab') {
			event.preventDefault();
			// Autocompletado real: tomamos la primera sugerencia si existe
			if (this.sugerencias.length > 0) {
				this.nuevoZapatilla = this.sugerencias[0];
				this.sugerencias = [];
				this.mostrarSugerencias = false;
			}
		}
	}

	seleccionarSugerencia(sugerencia: string) {
		this.nuevoZapatilla = sugerencia;
		this.sugerencias = [];
		this.mostrarSugerencias = false;
	}
}
