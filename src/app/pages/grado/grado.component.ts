import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GradoService } from '../../servicios/servicios.index';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { DomSanitizer } from '@angular/platform-browser';
const swal: SweetAlert = _swal as any;
import * as _ from "lodash";
import { tareaMaestro, Upload } from "../../modelos/tareas";

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styles: []
})
export class GradoComponent implements OnInit {
  
  textTarea: string = "Agregar Tarea";

  @ViewChild('labelImport')
  public labelImport: ElementRef;

  fileToUpload: File = null;

  public tipos: string[] = ['Video', 'Imagen', 'Audio', 'PDF', 'Power Point', 'Word'];

  public grados: string[] = [
    'Kinder 1', 'Kinder 2', 'Kinder 3', 'Kinder 4', 'Kinder 5', 'Kinder 6',
    'Grado 1', 'Grado 2', 'Grado 3', 'Grado 4', 'Grado 5', 'Grado 6', 'Grado 7'
  ];

  public verSemanas: any[] = [
    { nombre: 'Semanas Marzo', id: 31 },
    { nombre: 'Semana 1', id: 32 },
    { nombre: 'Semana 2', id: 33 },
    { nombre: 'Semana 3', id: 34 },
    { nombre: 'Semana 4', id: 35 },
    { nombre: 'Semana 5', id: 36 },
    { nombre: 'Semana 6 - Mayo', id: 37 },
    { nombre: 'Semana 7 - Mayo', id: 38 },
    { nombre: 'Semana 8 - Junio', id: 39 },
    { nombre: 'Semana 9 - Junio', id: 40 },
    { nombre: 'Semana 10 - Julio', id: 41 }
  ]

  public semanas: any[] = [
    { nombre: 'Semanas Marzo', id: 31 },
    { nombre: 'Semana 1', id: 32 },
    { nombre: 'Semana 2', id: 33 },
    { nombre: 'Semana 3', id: 34 },
    { nombre: 'Semana 4', id: 35 },
    { nombre: 'Semana 5', id: 36 },
    { nombre: 'Semana 6 - Mayo', id: 37 },
    { nombre: 'Semana 7 - Mayo', id: 38 },
    { nombre: 'Semana 8 - Junio', id: 39 },
    { nombre: 'Semana 9 - Junio', id: 40 },
    { nombre: 'Semana 10 - Julio', id: 41 }
  ];

  public parametroUrl: any =  this._route.snapshot.paramMap.get('grado');
  public tareasMaestro: tareaMaestro[];

  public nombreTarea: string;
  public tipo: string;
  public select_video: boolean;
  public select_img: boolean;
  public select_audio: boolean;
  public select_pdf: boolean;
  public select_word: boolean;
  public select_power: boolean;

  public urlArchivo: any;
  public url3 = environment.API_URL;

  public noSubido: boolean = true;
  public Subiendo: boolean;

  public no_semana: boolean;
  public no_tareas: boolean;
  public si_tareas: boolean;

  @ViewChild('formGuardarTareaMaestro') formGuardarTareaMaestro: NgForm;
  selectedFile: FileList;
  selectedFile2: Upload;
  files: File[] = [];
  foto: string;

  constructor(
    protected http: HttpClient,
    private _route: ActivatedRoute,
    public _GradoService: GradoService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.no_semana = true;
    let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
    cargando.style.opacity = '0';
    cargando.style.position = 'absolute';
    let formulario: HTMLElement = document.getElementById('formulario') as HTMLElement;
    formulario.style.position = 'relative';
    let inputTarea: HTMLElement = document.getElementById('inputTarea') as HTMLElement;
    inputTarea.style.pointerEvents = 'none';
  }

  selectSemanasEscuela() {
    this.http.get(this.url3 + '/api/v1/ccpe/retrieve/week').subscribe(
      res => {
        this.semanas = res['weeks'];
      }
    );
  }

  selectSemana(event) {
    this.http.post(this.url3 + '/api/v1/ccpe/retrieve/file/profesor', {
      idProfesor: JSON.parse(localStorage.getItem('id')),
      idSemana: event
    }).subscribe(
      res => {
        this.tareasMaestro = res['taskProfesor'];
        if(this.tareasMaestro.length > 0) {
          this.si_tareas = true;
          this.no_tareas = false;
          this.no_semana = false;
        } else {
          this.si_tareas = false;
          this.no_tareas = true;
          this.no_semana = false;
        }
      }
    );
  }

  guardarTareaMaestro(formGuardarTareaMaestro: NgForm): void {
    if(formGuardarTareaMaestro.value.archivoId == null) {

      this.Subiendo = true;
      this.noSubido = false;

      let formulario: HTMLElement = document.getElementById('formulario') as HTMLElement;
      formulario.style.opacity = '0';
      formulario.style.position = 'absolute';

      let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
      cargando.style.opacity = 'initial';
      cargando.style.position = 'initial';

      let files = this.selectedFile;
      let filesIndex = _.range(files.length);

      _.each(filesIndex, (idx) => {
        this.selectedFile2 = new Upload(files[idx]);
        this._GradoService.subirTareaMaestro(
          formGuardarTareaMaestro.value,
          this.selectedFile2,
          JSON.parse(localStorage.getItem('grado')),
          JSON.parse(localStorage.getItem('nombre'))
        );
      });

    } else {

      this.Subiendo = true;
      this.noSubido = false;

      let formulario: HTMLElement = document.getElementById('formulario') as HTMLElement;
      formulario.style.opacity = '0';
      formulario.style.position = 'absolute';

      let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
      cargando.style.opacity = 'initial';
      cargando.style.position = 'initial';

      let files = this.selectedFile;
      if (files == undefined) {
        this._GradoService.editarTarea(
          formGuardarTareaMaestro.value,
          JSON.parse(localStorage.getItem('grado')),
          JSON.parse(localStorage.getItem('nombre'))
        );
      } else {
        let filesIndex = _.range(files.length);
        _.each(filesIndex, (idx) => {
          this.selectedFile2 = new Upload(files[idx]);
          this._GradoService.editarTarea(
            formGuardarTareaMaestro.value,
            JSON.parse(localStorage.getItem('grado')),
            JSON.parse(localStorage.getItem('nombre')),
            this.selectedFile2
          );
        });
      }
    }
  }

  editarTareaMaestro(tareasMaestro: tareaMaestro) {
    this.textTarea = "Editar Tarea";
    if(tareasMaestro != null) {
      this._GradoService.tareaGrado.nombre = tareasMaestro.nombre;
      this._GradoService.tareaGrado.tipo = tareasMaestro.tipo;
      this._GradoService.tareaGrado.grado = tareasMaestro.grado;
      this._GradoService.tareaGrado.semanaId = tareasMaestro.semanaId;
      return;
    }
  }

  eliminarTarea(id: string, nombre: string) {
    swal({
      title: "¿Esta seguro de eliminar la tarea " + nombre + " ?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._GradoService.eliminarTarea(id);
      }
    });
  }

  resetearForm(tareasMaestro) {
    this.textTarea = "Agregar Tarea";
    tareasMaestro.form.controls.archivoId.setValue('');
    tareasMaestro.form.controls.nombre.setValue('');
    tareasMaestro.form.controls.url.setValue('');
    tareasMaestro.form.controls.tipo.setValue(undefined);
    tareasMaestro.form.controls.grado.setValue(undefined);
    tareasMaestro.form.controls.semanaId.setValue(undefined);
    return;
  }

  verTareaMaestro(nombre: string, tipo: string, url: string) {
    this.nombreTarea = nombre;

    if (tipo == 'Video') {
      this.select_video = true;
      this.select_img = false;
      this.select_pdf = false;
      this.select_audio = false;
      this.select_word = false;
      this.select_power = false;
      this.urlArchivo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if (tipo == 'Imagen') {
      this.select_video = false;
      this.select_img = true;
      this.select_pdf = false;
      this.select_audio = false;
      this.select_word = false;
      this.select_power = false;
      this.urlArchivo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if (tipo == 'PDF') {
      this.select_video = false;
      this.select_img = false;
      this.select_pdf = true;
      this.select_audio = false;
      this.select_word = false;
      this.select_power = false;
      this.urlArchivo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if (tipo == 'Audio') {
      this.select_video = false;
      this.select_img = false;
      this.select_pdf = false;
      this.select_audio = true;
      this.select_word = false;
      this.select_power = false;
      this.urlArchivo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'Word') {
      this.select_video = false;
      this.select_img = false;
      this.select_pdf = false;
      this.select_audio = false;
      this.select_word = true;
      this.select_power = false;
      this.urlArchivo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    if(tipo == 'Power Point') {
      this.select_video = false;
      this.select_img = false;
      this.select_pdf = false;
      this.select_audio = false;
      this.select_word = false;
      this.select_power = true;
      this.urlArchivo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  detectFileFotoPortada(event) {
    this.selectedFile = event.target.files;
    this.formGuardarTareaMaestro.controls['url'].setValue(event.target.files[0].name);
  }
}
