import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { CREDSolicitudesService } from './cred.solicitudes.service';
import { CRED_SolicitudesModel } from './cred.solicitudes.model';

@Component({
    selector: 'cred-solicitudes-page',
    templateUrl: './cred.solicitudes.page.html',
    // styleUrls: ['./cred.solicitudes.page.css'],
    providers: [CREDSolicitudesService]
})
export class CREDSolicitudesPage implements OnInit {
    CREDSolicitudesForm: FormGroup;
    isReadyToSave = false;

    selectedCREDSolicitudes: CRED_SolicitudesModel = new CRED_SolicitudesModel();

    @Input()
    operation: string;

    @Input()
    row: CRED_SolicitudesModel;

    constructor(public loadingctl: LoadingController,
                public modalCtrl: ModalController,
                public builder: FormBuilder,
                private credSolicitudesService: CREDSolicitudesService) {
        if (this.row) {
          this.selectedCREDSolicitudes = this.row;
        } else {
          this.selectedCREDSolicitudes = new CRED_SolicitudesModel();
        }

        this.CREDSolicitudesForm = this.builder.group({
            // compania: [ this.selectedCREDSolicitudes.compania, Validators.required ],        
           CREDSolicitudId: [ this.selectedCREDSolicitudes.credSolicitudId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9\.]+$') ] ],
           PrimerApellidoCREDSolicitud: [ this.selectedCREDSolicitudes.primerApellidoCREDSolicitud, [ Validators.required, Validators.maxLength(35) ] ],
           SegundoApellidoCREDSolicitud: [ this.selectedCREDSolicitudes.segundoApellidoCREDSolicitud, [ Validators.maxLength(38) ] ],
           PrimerNombreCREDSolicitud: [ this.selectedCREDSolicitudes.primerNombreCREDSolicitud, [ Validators.required, Validators.maxLength(56) ] ],
           SegundoNombreCREDSolicitud: [ this.selectedCREDSolicitudes.segundoNombreCREDSolicitud, [ Validators.maxLength(40) ] ],
           OtrosNombresCREDSolicitud: [ this.selectedCREDSolicitudes.otrosNombresCREDSolicitud, [ Validators.maxLength(73) ] ],
           TipoIDCREDSolicitud: [ this.selectedCREDSolicitudes.tipoIDCREDSolicitud, [ Validators.required, Validators.maxLength(2) ] ],
           NumeroIDCREDSolicitud: [ this.selectedCREDSolicitudes.numeroIDCREDSolicitud, [ Validators.required, Validators.maxLength(16), Validators.pattern('^[0-9\.]+$') ] ],
           FechaDeExpedicionCREDSolicitud: [ this.selectedCREDSolicitudes.fechaDeExpedicionCREDSolicitud, [ Validators.required ] ],
           LugarDeExpedicionCREDSolicitud: [ this.selectedCREDSolicitudes.lugarDeExpedicionCREDSolicitud, [ Validators.required, Validators.maxLength(13) ] ],
           NacionalidadCREDSolicitud: [ this.selectedCREDSolicitudes.nacionalidadCREDSolicitud, [ Validators.required, Validators.maxLength(10) ] ],
           LugarDeNacimientoCREDSolicitud: [ this.selectedCREDSolicitudes.lugarDeNacimientoCREDSolicitud, [ Validators.required, Validators.maxLength(17) ] ],
           FechaDeNacimientoCREDSolicitud: [ this.selectedCREDSolicitudes.fechaDeNacimientoCREDSolicitud, [ Validators.required ] ],
           SexoCREDSolicitud: [ this.selectedCREDSolicitudes.sexoCREDSolicitud, [ Validators.required, Validators.maxLength(9) ] ],
           EstadoCivilCREDSolicitud: [ this.selectedCREDSolicitudes.estadoCivilCREDSolicitud, [ Validators.required, Validators.maxLength(2) ] ],
           PersonasACargoCREDSolicitud: [ this.selectedCREDSolicitudes.personasACargoCREDSolicitud, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
           NivelEducativoCREDSolicitud: [ this.selectedCREDSolicitudes.nivelEducativoCREDSolicitud, [ Validators.required, Validators.maxLength(2) ] ],
           ProfesionCREDSolicitud: [ this.selectedCREDSolicitudes.profesionCREDSolicitud, [ Validators.maxLength(2) ] ],
           DireccionResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.direccionResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(250) ] ],
           IntentosDireccionResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.intentosDireccionResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9\.]+$') ] ],
           BarrioResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.barrioResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(48) ] ],
           CiudadMunicipioDeResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.ciudadMunicipioDeResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(39) ] ],
           DepartamentodeResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.departamentodeResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(24) ] ],
           TipodeviviendaCREDSolicitud: [ this.selectedCREDSolicitudes.tipodeviviendaCREDSolicitud, [ Validators.required, Validators.maxLength(2) ] ],
           EstratoCREDSolicitud: [ this.selectedCREDSolicitudes.estratoCREDSolicitud, [ Validators.required, Validators.maxLength(1) ] ],
           TelefonoResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.telefonoResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(20) ] ],
           NumeroCelularCREDSolicitud: [ this.selectedCREDSolicitudes.numeroCelularCREDSolicitud, [ Validators.maxLength(20) ] ],
           SuCorrespondenciaSeraEnviadaPorMedioElectronicoMailDeCREDSolicitud: [ this.selectedCREDSolicitudes.suCorrespondenciaSeraEnviadaPorMedioElectronicoMailDeCREDSolicitud, [ Validators.maxLength(150) ] ],
           SiNoDeseaMedioelectronicoMarqueCREDSolicitud: [ this.selectedCREDSolicitudes.siNoDeseaMedioelectronicoMarqueCREDSolicitud, [ Validators.maxLength(2) ] ],
           TiempoEnResidenciaCREDSolicitud: [ this.selectedCREDSolicitudes.tiempoEnResidenciaCREDSolicitud, [ Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9\.]+$') ] ],
           HaSidoUstedVictimaDeUnAtentadoTerroristaCombateCREDSolicitud: [ this.selectedCREDSolicitudes.haSidoUstedVictimaDeUnAtentadoTerroristaCombateCREDSolicitud, [ Validators.required ] ],
           ManejaOManejoRecursosPublicosCREDSolicitud: [ this.selectedCREDSolicitudes.manejaOManejoRecursosPublicosCREDSolicitud, [ Validators.required ] ],
           TieneOTuvoAlgunGradoDePoderPublicoCREDSolicitud: [ this.selectedCREDSolicitudes.tieneOTuvoAlgunGradoDePoderPublicoCREDSolicitud, [ Validators.required ] ],
           GozaOGozaDeReconocimientoPublicoCREDSolicitud: [ this.selectedCREDSolicitudes.gozaOGozaDeReconocimientoPublicoCREDSolicitud, [ Validators.required ] ],
           estado: [ this.selectedCREDSolicitudes.estado ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {
                    const data = formGroup.getRawValue();
                    const validationErrors = {
					    error_6: data && data.fechaDeNacimientoCREDSolicitud && data.fechaDeNacimientoCREDSolicitud.getFullYear() - 18 > 0
                    };

                    return validationErrors;
                }
        });

        // Watch the form for changes, and
        this.CREDSolicitudesForm.valueChanges.subscribe((v) => {
          this.isReadyToSave = this.CREDSolicitudesForm.valid;
        });
    }

    ngOnInit() {
        // this.getCRED_Solicitudes();
        // this.rows.push(this.selectedCREDSolicitudes);
    }

    onSubmit(formData: any) {
        if (this.CREDSolicitudesForm.valid) {
          this.credSolicitudesService.saveCRED_Solicitudes(this.selectedCREDSolicitudes)
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
