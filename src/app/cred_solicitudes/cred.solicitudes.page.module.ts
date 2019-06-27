import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CREDSolicitudesPage } from './cred.solicitudes.page';

@NgModule({
  declarations: [
    CREDSolicitudesPage,
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CREDSolicitudesPage }]),
    TranslateModule.forChild()
  ]
})
export class CREDSolicitudesPageModule { }
