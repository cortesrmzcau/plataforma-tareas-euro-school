import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DatePipe } from "@angular/common";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { GradoComponent } from './grado/grado.component';
import { AlumnosComponent } from './alumnos/alumnos.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        HeaderComponent,
        LeccionesComponent,
        GradoComponent,
        AlumnosComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MDBBootstrapModule.forRoot(),
        PAGES_ROUTES,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        PdfViewerModule,
        NgxDocViewerModule
    ],
    providers: [DatePipe
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class PagesModule { }