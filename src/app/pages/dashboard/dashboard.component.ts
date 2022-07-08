import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { LoginService } from '../../servicios/servicios.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public maestro: boolean;
  public alumno: boolean;

  public nombre: string;
  public cedula: string;
  public grado: string;

  public semana1: string = '1er Semana';
  public semana2: string = '2da Semana';

  public url3 = environment.API_URL;
  public semanas: any[];

  public semanasAlumno: any[] = [
    { nombre: 'Semanas Marzo', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 31 },
    { nombre: 'Semana 1', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 32 },
    { nombre: 'Semana 2', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 33 },
    { nombre: 'Semana 3', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 34 },
    { nombre: 'Semana 4', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 35 },
    { nombre: 'Semana 5', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 36 },
    { nombre: 'Semana 6 - Mayo', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 37 },
    { nombre: 'Semana 7 - Mayo', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 38 },
    { nombre: 'Semana 8 - Junio', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 39 },
    { nombre: 'Semana 9 - Junio', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 40 },
    { nombre: 'Semana 10 - Julio', img: 'https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg', value: 41 }
  ]

  constructor(
    protected _LoginService: LoginService,
    protected http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.obtenerInfo();
  }

  obtenerInfo() {
    if (JSON.parse(localStorage.getItem('tipo')) == 'ALUMNO') {
      this.nombre = JSON.parse(localStorage.getItem('nombre'));
      this.cedula = JSON.parse(localStorage.getItem('cedula'));
      this.grado = JSON.parse(localStorage.getItem('grado'));
      this.alumno = true;
    }

    if (JSON.parse(localStorage.getItem('tipo')) == 'MAESTRO') {
      this.nombre = JSON.parse(localStorage.getItem('nombre'));
      this.cedula = JSON.parse(localStorage.getItem('cedula'));
      this.grado = JSON.parse(localStorage.getItem('grado'));
      this.maestro = true;
    }
  }

}
