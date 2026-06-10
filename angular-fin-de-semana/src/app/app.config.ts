import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCSt5Lbnim6iJ28u7hgbS8qcEFB8bpXQs8",
  authDomain: "angularfincho.firebaseapp.com",
  databaseURL: "https://angularfincho-default-rtdb.firebaseio.com",
  projectId: "angularfincho",
  storageBucket: "angularfincho.firebasestorage.app",
  messagingSenderId: "351641022819",
  appId: "1:351641022819:web:df2b89fef2271bcd442356",
  measurementId: "G-KLS71GQZHR"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ]
};
