
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

    constructor(idSucursal: number,
                rutSucursal: string,
                nombre: string,
                direccion: string,
                codigo: number,
                telefono: string,
                rutRepLegal: string,
                nombreRepLegal: string,
                fax: string,
                giro: string,
                registroContado: boolean,
                numInicialRegContado: number) {
        this.idSucursal = idSucursal;
        this.rutSucursal = rutSucursal;
        this.nombre = nombre;
        this.direccion = direccion;
        this.codigo = codigo;
        this.telefono = telefono;
        this.rutRepLegal = rutRepLegal;
        this.nombreRepLegal = nombreRepLegal;
        this.fax = fax;
        this.giro = giro;
        this.registroContado = registroContado;
        this.numInicialRegContado = numInicialRegContado;
    }

}
