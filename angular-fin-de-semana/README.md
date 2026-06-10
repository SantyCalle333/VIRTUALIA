# AngularFinDeSemana 🚀

¡Bienvenido a **AngularFinDeSemana**! Este es un proyecto desarrollado implementando los más altos estándares de **Angular Moderno (Componentes Standalone)**, enfocado estrictamente en la **Limpieza de Código (Clean Code)**, la separación de responsabilidades y la eficiencia.

El sistema funciona como un panel de gestión visual de entidades (Zapatillas, Videojuegos, Cursos) conectado bidireccionalmente a la nube.

## 🌟 Características Destacadas

* **Arquitectura Standalone:** Cero dependencias de módulos antiguos (`NgModules`). Cada componente es autosuficiente, ligero y modular.
* **Sincronización en Tiempo Real:** Conectado directamente a **Firebase Realtime Database** a través de la librería oficial `@angular/fire`.
* **Clean Code & SOLID:** La lógica de red y base de datos vive 100% encapsulada en **Servicios Inyectables**.
* **Pruebas Unitarias Aisladas:** Cada componente incluye su propia batería de pruebas `.spec.ts` utilizando "Mocks".

## 🛠️ Tecnologías y Stack

* Framework Base: Angular CLI (v21.2+)
* Base de Datos: Firebase Realtime Database
* Runner de Pruebas: Jasmine / Karma

## 🚀 Guía de Inicio (Setup)

### 1. Preparar el Entorno

Una vez clonado este repositorio, instala todas las dependencias necesarias:

```bash
npm install
```

### 2. Entorno de Desarrollo

Para levantar el servidor local en modo vigilancia:

```bash
ng serve
```

## 🧪 Pruebas Unitarias

Para ejecutar toda la batería de `Specs`, corre:

```bash
ng test
```

## 🏗️ Anatomía del Proyecto

El código fuente está estructurado de la siguiente manera:

```text
src/
├── app/
│   ├── components/
│   ├── models/
│   ├── services/
│   └── app.component.ts
```

## ⚖️ Licencia y Derechos

Este proyecto se distribuye bajo los términos de la **Licencia MIT**.

> *Código estructurado, refactorizado y documentado para la excelencia del desarrollador.*

