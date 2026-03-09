import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideQueryClient, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app/app.routes';
import { LayoutComponent } from './app/layout/layout.component';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(LayoutComponent, {
    providers: [
        provideZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideQueryClient(new QueryClient()),
        provideHttpClient(),
        provideRouter(routes),
    ],
}).catch((err) => console.error(err));
