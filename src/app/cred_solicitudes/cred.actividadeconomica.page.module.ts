import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CREDActividadEconomicaPage } from './cred.actividadeconomica.page';

@NgModule({
  declarations: [
    CREDActividadEconomicaPage
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: CREDActividadEconomicaPage }
    ]),
    TranslateModule.forChild()
  ]
})
export class CREDActividadEconomicaPageModule { }
