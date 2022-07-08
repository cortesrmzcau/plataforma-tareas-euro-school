import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
        LoginService
   } from './servicios.index';
  
  @NgModule({
    imports: [
    ],
    providers: [
        LoginService
    ],
    declarations: []
  })
  export class ServiceModule { }
  