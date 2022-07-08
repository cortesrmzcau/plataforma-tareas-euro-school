import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/servicios.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    protected _LoginService: LoginService
  ) {
    this.formLogin = new FormGroup({
      nombreFL: new FormControl('', Validators.required),
      cedulaFL: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  formLoginAuth() {
    return this._LoginService.vf_service(this.formLogin.value.nombreFL, this.formLogin.value.cedulaFL);
  }

}
