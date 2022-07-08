import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { environment } from '../../../environments/environment.prod';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

import { tareaMaestro, tareaAlumno, Upload } from "../../modelos/tareas";

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  tareaGrado: tareaMaestro = new tareaMaestro();
  tareaAlumno: tareaAlumno = new tareaAlumno();

  url = environment.API_URL;
  public filePath = '/Maestros';
  uploadPercent: Observable<number>;

  constructor(
    private datePipe: DatePipe,
    protected http: HttpClient,
    private storage: AngularFireStorage
  ) {
  }

  subirTareaMaestro(
      formGuardarTareaMaestro: tareaMaestro,
      fileToUpload: Upload,
      grado: string,
      nombre: string) {

    const filePath = `${this.filePath}/${grado}/${formGuardarTareaMaestro.semanaId}/${nombre}/${formGuardarTareaMaestro.tipo}/${fileToUpload['file'].name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, fileToUpload.file);

    this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.http.post(this.url + '/api/v1/ccpe/create/file/profesor', {
                nombre: formGuardarTareaMaestro.nombre,
                url: downloadURL,
                grado: formGuardarTareaMaestro.grado,
                tipo: formGuardarTareaMaestro.tipo,
                profesorId: JSON.parse(localStorage.getItem('id')),
                semanaId: formGuardarTareaMaestro.semanaId,
                fecha: this.datePipe.transform(Date.now(), "MM-dd-yyyy")
              }).subscribe(
                res => {
                  if(res['response'] == '1') {
                    swal("Tarea subida exitosamente", "", "success").then(
                      res => {
                        let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
                        cargando.style.opacity = '0';
                        cargando.style.position = 'absolute';

                        let modalAT: HTMLElement = document.getElementById('modalAT') as HTMLElement;
                        modalAT.style.opacity = '0';
                        location.reload();
                      }
                    );
                  } else {
                    swal("Hubo un problema", "Intentelo nuevamente", "warning");
                  }
                }
              );
            });
          })
      ).subscribe();
  }

  editarTarea(formGuardarTareaMaestro: tareaMaestro, grado: string, nombre: string, fileToUpload?: Upload) {
    if(fileToUpload == undefined) {
      this.http.put(this.url + '/api/v1/ccpe/update/file/profesor', {
        nombre: formGuardarTareaMaestro.nombre,
        url: formGuardarTareaMaestro.url,
        grado: formGuardarTareaMaestro.grado,
        tipo: formGuardarTareaMaestro.tipo,
        profesorId: JSON.parse(localStorage.getItem('id')),
        semanaId: formGuardarTareaMaestro.semanaId,
        fecha: this.datePipe.transform(Date.now(), "MM-dd-yyyy"),
        archivoId: formGuardarTareaMaestro.archivoId
      }).subscribe(
        res => {
          if(res['response'] == '1') {
            swal("Tarea actualizada exitosamente", "", "success").then(
              res => {
                let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
                cargando.style.opacity = '0';
                cargando.style.position = 'absolute';

                let modalAT: HTMLElement = document.getElementById('modalAT') as HTMLElement;
                modalAT.style.opacity = '0';
                location.reload();
              }
            );
          } else {
            swal("Hubo un problema", "Intentelo nuevamente", "warning");
          }
        }
      );
    } else {
      const filePath = `${this.filePath}/${grado}/${formGuardarTareaMaestro.semanaId}/${nombre}/${formGuardarTareaMaestro.tipo}/${fileToUpload['file'].name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, fileToUpload.file);

      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.http.put(this.url + '/api/v1/ccpe/update/file/profesor', {
                nombre: formGuardarTareaMaestro.nombre,
                url: downloadURL,
                grado: formGuardarTareaMaestro.grado,
                tipo: formGuardarTareaMaestro.tipo,
                profesorId: JSON.parse(localStorage.getItem('id')),
                semanaId: formGuardarTareaMaestro.semanaId,
                fecha: this.datePipe.transform(Date.now(), "MM-dd-yyyy"),
                archivoId: formGuardarTareaMaestro.archivoId
              }).subscribe(
                res => {
                  if(res['response'] == '1') {
                    swal("Tarea actualizada exitosamente", "", "success").then(
                      res => {
                        let cargando: HTMLElement = document.getElementById('cargando') as HTMLElement;
                        cargando.style.opacity = '0';
                        cargando.style.position = 'absolute';

                        let modalAT: HTMLElement = document.getElementById('modalAT') as HTMLElement;
                        modalAT.style.opacity = '0';
                        location.reload();
                      }
                    );
                  } else {
                    swal("Hubo un problema", "Intentelo nuevamente", "warning");
                  }
                }
              );
            });
          })
      ).subscribe();
    }
  }

  eliminarTarea(id: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idTask: id
      }
    };

    this.http.delete(this.url + '/api/v1/ccpe/delete/file/profesor', options)
    .subscribe(
      res => {
        swal("La tarea ha sido borrada exitosamente", "", "success").then(
          res => {
            location.reload();
          }
        );
      }
    );
  }

  calificarTareaAlumno(calificarTareaAlumno: any) {
    this.http.put(this.url + '/api/v1/ccpe/update/calif/student', {
      archivoId: calificarTareaAlumno.id,
      calificacion: calificarTareaAlumno.calificacion
    }).subscribe(
      res => {
        swal("La tarea ha sido calificada exitosamente", "", "success").then(
          res => {
            location.reload();
          }
        );
      }
    );
  }
}
