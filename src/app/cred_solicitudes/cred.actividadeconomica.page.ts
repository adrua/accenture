import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { CREDActividadEconomicaService } from './cred.actividadeconomica.service';
import { CRED_ActividadEconomicaModel } from './cred.actividadeconomica.model';

@Component({
    selector: 'cred-actividadeconomica-page',
    templateUrl: './cred.actividadeconomica.page.html',
    // styleUrls: ['./cred.actividadeconomica.page.css'],
    providers: [CREDActividadEconomicaService]
})
export class CREDActividadEconomicaPage implements OnInit {
    CREDActividadEconomicaForm: FormGroup;
    isReadyToSave = false;

    selectedCREDActividadEconomica: CRED_ActividadEconomicaModel = new CRED_ActividadEconomicaModel();
    // selectedCRED_Solicitudes: CRED_SolicitudesModel;
    // CRED_SolicitudesForm: FormGroup;

    @Input()
    operation: string;

    @Input()
    row: CRED_ActividadEconomicaModel;

    constructor(public loadingctl: LoadingController,
                public modalCtrl: ModalController,
                public builder: FormBuilder,
                private credActividadEconomicaService: CREDActividadEconomicaService) {
        if (this.row) {
          this.selectedCREDActividadEconomica = this.row;
        } else {
          this.selectedCREDActividadEconomica = new CRED_ActividadEconomicaModel();
        }

        // If we navigated to this page, we will have an item available as a nav param
        // this.selectedCRED_Solicitudes = navParams.get('CRED_Solicitudes');
        this.CREDActividadEconomicaForm = this.builder.group({
            // compania: [ this.selectedCREDActividadEconomica.compania, Validators.required ],
           CREDSolicitudId: [ this.selectedCREDActividadEconomica.credSolicitudId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
           ActividadOcupacionActividadEconomicaCRED: [ this.selectedCREDActividadEconomica.actividadOcupacionActividadEconomicaCRED, [ Validators.required, Validators.maxLength(2) ] ],
           // CRED_ActividadEconomica: [ this.selectedCREDActividadEconomica.creD_ActividadEconomica, [ Validators.maxLength(128) ] ],
           TipoDeContratoActividadEconomicaCRED: [ this.selectedCREDActividadEconomica.tipoDeContratoActividadEconomicaCRED, [ Validators.maxLength(2) ] ],
           TipoDeIndependienteActividadEconomicaCRED: [ this.selectedCREDActividadEconomica.tipoDeIndependienteActividadEconomicaCRED, [ Validators.maxLength(2) ] ],
           Participacion: [ this.selectedCREDActividadEconomica.participacion, [ Validators.maxLength(5), Validators.pattern('^[0-9\.]+$') ] ],
           CodigoCIU: [ this.selectedCREDActividadEconomica.codigoCIU, [ Validators.required, Validators.maxLength(8), Validators.pattern('^[0-9\.]+$') ] ],
           estado: [ this.selectedCREDActividadEconomica.estado ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    let validationErrors = {
//						'error_6': data.fechaDeNacimientoCREDSolicitud >= new Date() - 18 * 365   
                    };

                    return validationErrors;
                }
        });


        // Watch the form for changes, and
        this.CREDActividadEconomicaForm.valueChanges.subscribe((v) => {
          this.isReadyToSave = this.CREDActividadEconomicaForm.valid;
        });
    }

    ngOnInit() {
        // this.getCRED_ActividadEconomica();
        // this.rows.push(this.selectedCREDActividadEconomica);
    }

    onSubmit(formData: any) {
        if (this.CREDActividadEconomicaForm.valid) {
          this.credActividadEconomicaService.saveCRED_ActividadEconomica(this.selectedCREDActividadEconomica)
                .subscribe((row) => this.modalCtrl.dismiss({ data: row, result: true }));
        }
    }

    /**
     * The user cancelled, so we dismiss without sending data back.
     */
    cancel() {
        this.modalCtrl.dismiss({ result: false });
    }

    /**
     * The user is done and wants to create the item, so return it
     * back to the presenter.
     */
    done() {
        this.modalCtrl.dismiss({ result: false });
    }
}
