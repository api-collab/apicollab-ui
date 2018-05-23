import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
const loginRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component:  LoginComponent,
        children: [
        ]
    }
];


@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(loginRoutes)
    ]
  })
  export class LoginRoutingModule { }

