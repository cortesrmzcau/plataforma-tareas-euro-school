import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public maestro: boolean;
  public alumno: boolean;
  
  public nombre: string;
  public cedula: string;
  public grado: string;

  constructor(
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

  salir() {
    localStorage.clear();
    window.location.href = '#/login';
  }

}
