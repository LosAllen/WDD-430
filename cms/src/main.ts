// src/main.ts
import { bootstrapApplication }    from '@angular/platform-browser';
import { importProvidersFrom }     from '@angular/core';
import { provideHttpClient,
         withInterceptorsFromDi }  from '@angular/common/http';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { RouterModule }            from '@angular/router';
import { DragDropModule }          from '@angular/cdk/drag-drop';
import { HttpClientModule }        from '@angular/common/http';

import { AppComponent }            from './app/app.component';
import { routes }                  from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(DragDropModule),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
.catch(err => console.error(err));
