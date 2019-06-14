
export class ISubsidiaryPostModel {
    public rutSucursal: string;
    public idSucursal: number;
    public nombre: string;
    public direccion: string;
    public codigo: number;
    public telefono: string;
    public rutRepLegal: string;
    public nombreRepLegal: string;
    public fax: string;
    public giro: string;
    public registroContado: boolean;
    public numInicialRegContado: number;

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
