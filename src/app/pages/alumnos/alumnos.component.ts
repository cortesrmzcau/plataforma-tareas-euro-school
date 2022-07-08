import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { GradoService } from '../../servicios/servicios.index';
import { tareaAlumno } from "../../modelos/tareas";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: []
})
export class AlumnosComponent implements OnInit {

  public gradoAlumnos: string = JSON.parse(localStorage.getItem('grado'));

  public url3 = environment.API_URL;

  public verSemanas: any[] = [
    { nombre: 'Semanas Marzo', value: 31 },
    { nombre: 'Semana 1', value: 32 },
    { nombre: 'Semana 2', value: 33 },
    { nombre: 'Semana 3', value: 34 },
    { nombre: 'Semana 4', value: 35 },
    { nombre: 'Semana 5', value: 36 },
    { nombre: 'Semana 6 - Mayo', value: 37 },
    { nombre: 'Semana 7 - Mayo', value: 38 },
    { nombre: 'Semana 8 - Junio', value: 39 },
    { nombre: 'Semana 9 - Junio', value: 40 },
    { nombre: 'Semana 10 - Julio', value: 41 }
  ]

  public calificaciones: any[] = [
    '0', '1', '2', '3', '4', '5'
  ];

  public tareasAlumnos: tareaAlumno[];

  public tareaAlumnoNombre: string;

  public no_tarea: boolean;
  public no_tareas_alumnos: boolean;
  public si_tareas_alumnos: boolean;

  constructor(
    protected http: HttpClient,
    public _GradoService: GradoService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.no_tarea = true;
  }

  selectSemanaTA(event) {
    this.http.post(this.url3 + '/api/v1/ccpe/retrieve/task/profesor', {
      profesorId: JSON.parse(localStorage.getItem('id')),
      semanaId: event
    }).subscribe(
      res => {
        this.tareasAlumnos = res['fileStudent'];
        if(this.tareasAlumnos.length > 0) {
          this.no_tarea = false;
          this.no_tareas_alumnos = false;
          this.si_tareas_alumnos = true;
        } else {
          this.no_tarea = false;
          this.no_tareas_alumnos = true;
          this.si_tareas_alumnos = false;
        }
      }
    );
  }

  calificarAlumno(tareaAlumno: tareaAlumno) {
    if(tareaAlumno != null) {
      this.tareaAlumnoNombre = tareaAlumno.nombre;
      this._GradoService.tareaAlumno = Object.assign({}, tareaAlumno);
    }
  }

  calificarTareaAlumno(formCalificacionAlumno: NgForm) {
    this._GradoService.calificarTareaAlumno(formCalificacionAlumno.value);
  }

  resetearFormTA(formCalificacionAlumno) {
    formCalificacionAlumno.form.controls.id.setValue('');
    formCalificacionAlumno.form.controls.calificacion.setValue(undefined);
  }

}
