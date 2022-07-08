import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.API_URL;

  constructor(
    protected http: HttpClient
  ) {
  }

  vf_service(usuario: string, matricula: string) {
    return this.http.post(this.url + '/api/v1/ccpe/login/information/students', {
      name: usuario,
      cedulaId: matricula
    }).subscribe(
      res => {
        // Cabrera Schenk Micaela 7626772
        // Alejandra Ramirez 2037339

        if (res['response'] == 0) {
          swal("Usuario o cedula incorrectos", "Por favor intentelo nuevamente", "warning");
        }

        if (res['response'] == 1) {
          if (res['tipo'] == 'ALUMNO') {
            localStorage.setItem('tipo', JSON.stringify(res['tipo']));
            localStorage.setItem('id', JSON.stringify(res['id']));
            localStorage.setItem('nombre', JSON.stringify(res['nombre']));
            localStorage.setItem('cedula', JSON.stringify(res['cedula']));
            localStorage.setItem('grado', JSON.stringify(res['grado']));
            localStorage.setItem('id_profesor', JSON.stringify(res['idProfesor']));
            window.location.href = '#/dashboard';
          }

          if (res['tipo'] == 'MAESTRO') {
            localStorage.setItem('tipo', JSON.stringify(res['tipo']));
            localStorage.setItem('id', JSON.stringify(res['id']));
            localStorage.setItem('nombre', JSON.stringify(res['nombre']));
            localStorage.setItem('cedula', JSON.stringify(res['cedula']));
            localStorage.setItem('grado', JSON.stringify(res['grado']));
            window.location.href = '#/dashboard';
          }
        }
      }
    );
  }

}