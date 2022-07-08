import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { GradoComponent } from './grado/grado.component';
import { AlumnosComponent } from './alumnos/alumnos.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [],
        children: [
            { path: 'dashboard', component: DashboardComponent , data: { titulo: 'Home' } },
            { path: 'leccion/:semanaid', component: LeccionesComponent , data: { titulo: 'Lecciones' } },
            { path: 'alumnos/:alumnoid', component: AlumnosComponent , data: { titulo: 'Alumnos' } },
            { path: 'grado/:grado', component: GradoComponent , data: { titulo: 'Grado' } },
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );