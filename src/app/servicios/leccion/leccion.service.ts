import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { environment } from '../../../environments/environment.prod';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

import { subirTarea } from "../../modelos/tareas";

@Injectable({
  providedIn: 'root'
})
export class LeccionService {

  subirTarea: subirTarea = new subirTarea();
  
  url = environment.API_URL;
  public filePath = '/Alumnos';
  uploadPercent: Observable<number>;

  constructor(
    private datePipe: DatePipe,
    protected http: HttpClient,
    private storage: AngularFireStorage
  ) {
  }

  subirTareaAlumno(nombre: string, fileToUpload: any, grado: any, alumnoId: any,
    semanaId: any, profesorId: any) {
    
    const file = fileToUpload;
    const filePath = `${this.filePath}/${grado}/${alumnoId}/${semanaId}/${nombre}/${fileToUpload.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              this.http.post(this.url + '/api/v1/ccpe/create/file/students', {
                nombre: nombre,
                url: downloadURL,
                grado: grado,
                fecha: this.datePipe.transform(Date.now(), "MM-dd-yyyy"),
                alumnoId: alumnoId,
                semanaId: semanaId,
                profesorId: profesorId
              }).subscribe(
                res => {
                  if(res['response'] == '1') {
                    swal("Tarea subida exitosamente", "", "success").then(
                      () => {
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

  borrarMiTarea(id: string, nombre: string) {
    console.log(id);
    this.http.delete(this.url + '/api/v1/ccpe/delete/file/students/' + id , {
    }).subscribe(
      res => {
        console.log(res);
        swal('Mi tarea ' + nombre + ' borrada exitosamente', "", "success").then(
          () => {
            location.reload();
          }
        );
      }
    );
  }

}