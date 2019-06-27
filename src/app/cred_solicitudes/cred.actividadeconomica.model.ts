export enum EnumActividadOcupacionActividadEconomicaCRED {
  'Asalariado' = 'AS',
  'Independiente' = 'IN',
  'Pensionado' = 'PE',
  'Estudiante' = 'ES',
  'Ama_de_casa' = 'AM'
}

export enum EnumTipoDeContratoActividadEconomicaCRED {
  'Indefinido' = 'IN',
  'Temporal' = 'TM',
  'Termino_Fijo' = 'TF',
  'Labor_de_Obra' = 'LO'
}

export enum EnumTipoDeIndependienteActividadEconomicaCRED {
  'Contratista' = 'CO',
  'Ganadero-Agricultor' = 'GA',
  'Transportador' = 'TR',
  'Comerciante' = 'CM',
  'Consultor-Asesor' = 'CA',
  'Industrial' = 'IN',
  'Rentista' = 'RE'
}

export class CRED_ActividadEconomicaModel {
    public compania: number = 1;
    public credSolicitudId: number;
    public actividadOcupacionActividadEconomicaCRED: EnumActividadOcupacionActividadEconomicaCRED = EnumActividadOcupacionActividadEconomicaCRED['Pensionado'];
    public creD_ActividadEconomica_Comp: string;
    public tipoDeContratoActividadEconomicaCRED: EnumTipoDeContratoActividadEconomicaCRED = EnumTipoDeContratoActividadEconomicaCRED['Labor_de_obra'];
    public tipoDeIndependienteActividadEconomicaCRED: EnumTipoDeIndependienteActividadEconomicaCRED = EnumTipoDeIndependienteActividadEconomicaCRED['Contratista'];
    public participacion: number = 0.0;
    public codigoCIU: number;
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.credSolicitudId = json.credSolicitudId;
            this.actividadOcupacionActividadEconomicaCRED = json.actividadOcupacionActividadEconomicaCRED;
            this.creD_ActividadEconomica_Comp =  json.creD_ActividadEconomica_Comp;
            this.tipoDeContratoActividadEconomicaCRED = json.tipoDeContratoActividadEconomicaCRED;
            this.tipoDeIndependienteActividadEconomicaCRED = json.tipoDeIndependienteActividadEconomicaCRED;
            this.participacion = json.participacion;
            this.codigoCIU = json.codigoCIU;
        }
    }
}
