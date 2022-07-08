import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LeccionService } from '../../servicios/servicios.index';
import { DomSanitizer } from '@angular/platform-browser';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { environment } from '../../../environments/environment.prod';
import { DatePipe } from "@angular/common";
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styles: []
})
export class LeccionesComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  public filePath = '/Alumnos';
  url: string = '';
  nombreTareaSubir: string;

  public no_selected: boolean = true;
  public select_video: boolean;
  public select_img: boolean;
  public select_audio: boolean;
  public select_pdf: boolean;
  public select_word: boolean;
  public select_power: boolean;

  public tareasMaestro: string[] = new Array;
  public misTareas: string[] = new Array;

  public tablaTareasMestro: boolean;
  public tablaMisTareas: boolean;

  headElements = ['N°', 'Nombre', 'Ver Tarea', 'Subir'];
  headElements2 = ['N°', 'Nombre', 'Calificación', 'Fecha Entrega', 'Descargar', 'Borrar'];

  @ViewChild('labelImport')
  labelImport: ElementRef;
  fileToUpload: File = null;

  url2: any;
  url3 = environment.API_URL;

  idSemana = this._route.snapshot.paramMap.get('semanaid');
  nombreTareaMaestroAlumno: string;
  gradoTareaMaestroAlumno: string;
  fecha: any = this.datePipe.transform(Date.now(), "MM-dd-yyyy");
  alumnoId: any = JSON.parse(localStorage.getItem('id'));
  profesorId: any = JSON.parse(localStorage.getItem('id_profesor'));
  idProfesor: string;

  constructor(
    private datePipe: DatePipe,
    private _route: ActivatedRoute,
    protected http: HttpClient,
    public _LeccionService: LeccionService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.tareasAlumno();
    let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
    cargando.style.opacity = '0';
    cargando.style.position = 'absolute';
  }

  tareasAlumno() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.url3 + '/api/v1/ccpe/retrieve/file/profesor/tostudent', {
      semanaId: Number(this.idSemana),
      grado: JSON.parse(localStorage.getItem('grado'))
    }, { headers: headers }).subscribe(
      res => {
        this.tareasMaestro = res['taskProfesor'];
        this.tablaTareasMestro = true;
      }
    );
  }

  visualizarTarea2(tarea: any) {
    this.nombreTareaSubir = tarea.nombre;
    this.gradoTareaMaestroAlumno = tarea.grado;
    this.idProfesor = tarea.profesorId;
  }

  formSubirTareaAlumno() {
    let formulario: HTMLElement = document.getElementById('formulario') as HTMLElement;
    formulario.style.opacity = '0';
    formulario.style.position = 'absolute';

    let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
    cargando.style.opacity = 'initial';
    cargando.style.position = 'initial';

    this._LeccionService.subirTareaAlumno(
      this.nombreTareaSubir,
      this.fileToUpload,
      this.gradoTareaMaestroAlumno,
      this.alumnoId,
      this.idSemana,
      this.idProfesor
    );
  }

  mostrarTablaPendientes() {
    this.tablaTareasMestro = true;
    this.tablaMisTareas = false;

    let btn_tareasPendientes: HTMLElement = document.getElementById('btn_tareasPendientes') as HTMLElement;
    btn_tareasPendientes.className = 'btn btn-a';

    let btn_tareasEntregadas: HTMLElement = document.getElementById('btn_tareasEntregadas') as HTMLElement;
    btn_tareasEntregadas.className = 'btn btn-d';
  }

  mostrarTablaMisTareas() {

    let btn_tareasPendientes: HTMLElement = document.getElementById('btn_tareasPendientes') as HTMLElement;
    btn_tareasPendientes.className = 'btn btn-d';

    let btn_tareasEntregadas: HTMLElement = document.getElementById('btn_tareasEntregadas') as HTMLElement;
    btn_tareasEntregadas.className = 'btn btn-a';

    this.http.get(this.url3 + '/api/v1/ccpe/retrieve/file/students/' + JSON.parse(localStorage.getItem('id')) , {
    }).subscribe(
      res => {
        this.misTareas = res['fileStudent'];
        this.tablaTareasMestro = false;
        this.tablaMisTareas = true;
        console.log(this.misTareas);
      }
    );
  }

  borrarMiTarea(tarea: any) {

    swal({
      title: "¿Esta seguro de eliminar mi tarea " + tarea.nombre + " ?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._LeccionService.borrarMiTarea(tarea.id, tarea.nombre);
      }
    });
  }

  visualizarTarea(nombre: string, tipo: string, url: string) {
    this.nombreTareaSubir = nombre;
    
    if(tipo == 'Video') {
      this.no_selected = false;
      this.select_video = true;
      this.select_img = false;
      this.select_audio = false;
      this.select_pdf = false;
      this.select_word = false;
      this.select_power = false;
      this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'Imagen') {
      this.no_selected = false;
      this.select_video = false;
      this.select_img = true;
      this.select_audio = false;
      this.select_pdf = false;
      this.select_word = false;
      this.select_power = false;
      this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'Audio') {
      this.no_selected = false;
      this.select_video = false;
      this.select_img = false;
      this.select_audio = true;
      this.select_pdf = false;
      this.select_word = false;
      this.select_power = false;
      this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'PDF') {
      this.no_selected = false;
      this.select_video = false;
      this.select_img = false;
      this.select_audio = false;
      this.select_pdf = true;
      this.select_word = false;
      this.select_power = false;
      this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'Word') {
      this.no_selected = false;
      this.select_video = false;
      this.select_img = false;
      this.select_pdf = false;
      this.select_audio = false;
      this.select_word = true;
      this.select_power = false;
      this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'Power Point') {
      this.no_selected = false;
      this.select_video = false;
      this.select_img = false;
      this.select_pdf = false;
      this.select_audio = false;
      this.select_word = false;
      this.select_power = true;
      this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    window.scrollTo(0, 0);
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }
}
