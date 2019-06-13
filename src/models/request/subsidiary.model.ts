export class ISubsidiaryPostModel {
    private idSucursal: number;
    private rutSucursal: string;
    private nombre: string;
    private direccion: string;
    private codigo: number;
    private telefono: string;
    private rutRepLegal: string;
    private nombreRepLegal: string;
    private fax: string;
    private giro: string;
    private registroContado: boolean;
    private numInicialRegContado: number;

    constructor(private idSucursal: number,
        private rutSucursal: string,
        private nombre: string,
        private direccion: string,
        private codigo: number,
        private telefono: string,
        private rutRepLegal: string,
        private nombreRepLegal: string,
        private fax: string,
        private giro: string,
        private registroContado: boolean,
        private numInicialRegContado: number){
            this.rutSucursal = rutSucursal;
            
    }
}
