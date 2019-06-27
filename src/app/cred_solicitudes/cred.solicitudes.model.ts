export enum EnumTipoIDCREDSolicitud {
  'TI' = 'TI',
  'CC' = 'CC',
  'CE' = 'CE',
  'Pasaporte' = 'PA',
  'Carnet_DIP' = 'CA',
  'Registro_Civil' = 'RE'
}

export enum EnumEstadoCivilCREDSolicitud {
  'Casado' = 'CA',
  'Soltero' = 'SO',
  'Divorciado' = 'DI',
  'Viudo' = 'VI',
  'Union_libre' = 'UL'
}

export enum EnumNivelEducativoCREDSolicitud {
  'Ninguno' = 'NI',
  'Primaria' = 'PR',
  'Bachiller' = 'BA',
  'Aux_Tecnico' = 'AU',
  'Tecnologo' = 'TE',
  'Est_Universitario' = 'ES',
  'Profesional' = 'PF',
  'Posgrado' = 'PO',
  'Maestria_Doctorado' = 'MA'
}

export enum EnumProfesionCREDSolicitud {
  'Educacion' = 'ED',
  'Matematicas' = 'MA',
  'Salud' = 'SA',
  'Religiosos' = 'RE',
  'Derecho' = 'DE',
  'Ciencias_Humanas' = 'CH',
  'Ciencias_Naturales' = 'CN',
  'Ciencias_Economicas' = 'CE',
  'Cincias_Fisicas' = 'CF',
  'Ingenierias' = 'IN',
  'Artes_y_Medios' = 'AM'
}

export enum EnumTipodeviviendaCREDSolicitud {
  'Propia_' = 'PR',
  'Familiar_' = 'FA',
  'Arriendo' = 'AR'
}

export enum EnumEstratoCREDSolicitud {
  '_1' = '1',
  '_2' = '2',
  '_3' = '3',
  '_4' = '4',
  '_5' = '5',
  '_6' = '6'
}

export enum EnumSiNoDeseaMedioelectronicoMarqueCREDSolicitud {
  'Residencia' = 'RE',
  '_Oficina' = 'OF'
}

export class CRED_SolicitudesModel {
    public compania: number = 1;
    public credSolicitudId: number;
    public primerApellidoCREDSolicitud: string;
    public segundoApellidoCREDSolicitud: string;
    public primerNombreCREDSolicitud: string;
    public segundoNombreCREDSolicitud: string;
    public otrosNombresCREDSolicitud: string;
    public tipoIDCREDSolicitud: EnumTipoIDCREDSolicitud = EnumTipoIDCREDSolicitud['CC'];
    public numeroIDCREDSolicitud: number;
    public fechaDeExpedicionCREDSolicitud: Date;
    public lugarDeExpedicionCREDSolicitud: string;
    public nacionalidadCREDSolicitud: string;
    public lugarDeNacimientoCREDSolicitud: string;
    public fechaDeNacimientoCREDSolicitud: Date;
    public sexoCREDSolicitud: string;
    public estadoCivilCREDSolicitud: EnumEstadoCivilCREDSolicitud = EnumEstadoCivilCREDSolicitud['Soltero'];
    public personasACargoCREDSolicitud: number;
    public nivelEducativoCREDSolicitud: EnumNivelEducativoCREDSolicitud = EnumNivelEducativoCREDSolicitud['Ninguno'];
    public profesionCREDSolicitud: EnumProfesionCREDSolicitud = EnumProfesionCREDSolicitud['Enderezador_de_chicharrones'];
    public direccionResidenciaCREDSolicitud: string;
    public intentosDireccionResidenciaCREDSolicitud: number;
    public barrioResidenciaCREDSolicitud: string;
    public ciudadMunicipioDeResidenciaCREDSolicitud: string;
    public departamentodeResidenciaCREDSolicitud: string;
    public tipodeviviendaCREDSolicitud: EnumTipodeviviendaCREDSolicitud = EnumTipodeviviendaCREDSolicitud['Arriendo'];
    public estratoCREDSolicitud: EnumEstratoCREDSolicitud = EnumEstratoCREDSolicitud['3'];
    public telefonoResidenciaCREDSolicitud: string;
    public numeroCelularCREDSolicitud: string;
    public suCorrespondenciaSeraEnviadaPorMedioElectronicoMailDeCREDSolicitud: string;
    public siNoDeseaMedioelectronicoMarqueCREDSolicitud: EnumSiNoDeseaMedioelectronicoMarqueCREDSolicitud = EnumSiNoDeseaMedioelectronicoMarqueCREDSolicitud['False'];
    public tiempoEnResidenciaCREDSolicitud: number;
    public haSidoUstedVictimaDeUnAtentadoTerroristaCombateCREDSolicitud: boolean;
    public manejaOManejoRecursosPublicosCREDSolicitud: boolean;
    public tieneOTuvoAlgunGradoDePoderPublicoCREDSolicitud: boolean;
    public gozaOGozaDeReconocimientoPublicoCREDSolicitud: boolean;
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.credSolicitudId = json.credSolicitudId;
            this.primerApellidoCREDSolicitud = json.primerApellidoCREDSolicitud;
            this.segundoApellidoCREDSolicitud = json.segundoApellidoCREDSolicitud;
            this.primerNombreCREDSolicitud = json.primerNombreCREDSolicitud;
            this.segundoNombreCREDSolicitud = json.segundoNombreCREDSolicitud;
            this.otrosNombresCREDSolicitud = json.otrosNombresCREDSolicitud;
            this.tipoIDCREDSolicitud = json.tipoIDCREDSolicitud;
            this.numeroIDCREDSolicitud = json.numeroIDCREDSolicitud;
            this.fechaDeExpedicionCREDSolicitud = json.fechaDeExpedicionCREDSolicitud;
            this.lugarDeExpedicionCREDSolicitud = json.lugarDeExpedicionCREDSolicitud;
            this.nacionalidadCREDSolicitud = json.nacionalidadCREDSolicitud;
            this.lugarDeNacimientoCREDSolicitud = json.lugarDeNacimientoCREDSolicitud;
            this.fechaDeNacimientoCREDSolicitud = json.fechaDeNacimientoCREDSolicitud;
            this.sexoCREDSolicitud = json.sexoCREDSolicitud;
            this.estadoCivilCREDSolicitud = json.estadoCivilCREDSolicitud;
            this.personasACargoCREDSolicitud = json.personasACargoCREDSolicitud;
            this.nivelEducativoCREDSolicitud = json.nivelEducativoCREDSolicitud;
            this.profesionCREDSolicitud = json.profesionCREDSolicitud;
            this.direccionResidenciaCREDSolicitud = json.direccionResidenciaCREDSolicitud;
            this.intentosDireccionResidenciaCREDSolicitud = json.intentosDireccionResidenciaCREDSolicitud;
            this.barrioResidenciaCREDSolicitud = json.barrioResidenciaCREDSolicitud;
            this.ciudadMunicipioDeResidenciaCREDSolicitud = json.ciudadMunicipioDeResidenciaCREDSolicitud;
            this.departamentodeResidenciaCREDSolicitud = json.departamentodeResidenciaCREDSolicitud;
            this.tipodeviviendaCREDSolicitud = json.tipodeviviendaCREDSolicitud;
            this.estratoCREDSolicitud = json.estratoCREDSolicitud;
            this.telefonoResidenciaCREDSolicitud = json.telefonoResidenciaCREDSolicitud;
            this.numeroCelularCREDSolicitud = json.numeroCelularCREDSolicitud;
            this.suCorrespondenciaSeraEnviadaPorMedioElectronicoMailDeCREDSolicitud = json.suCorrespondenciaSeraEnviadaPorMedioElectronicoMailDeCREDSolicitud;
            this.siNoDeseaMedioelectronicoMarqueCREDSolicitud = json.siNoDeseaMedioelectronicoMarqueCREDSolicitud;
            this.tiempoEnResidenciaCREDSolicitud = json.tiempoEnResidenciaCREDSolicitud;
            this.haSidoUstedVictimaDeUnAtentadoTerroristaCombateCREDSolicitud = json.haSidoUstedVictimaDeUnAtentadoTerroristaCombateCREDSolicitud;
            this.manejaOManejoRecursosPublicosCREDSolicitud = json.manejaOManejoRecursosPublicosCREDSolicitud;
            this.tieneOTuvoAlgunGradoDePoderPublicoCREDSolicitud = json.tieneOTuvoAlgunGradoDePoderPublicoCREDSolicitud;
            this.gozaOGozaDeReconocimientoPublicoCREDSolicitud = json.gozaOGozaDeReconocimientoPublicoCREDSolicitud;
        }
    }
}
