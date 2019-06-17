
/**
 * Model for put operation
 */
class RequestPutUser {
    public rut: string;
    public enabled: boolean;

    constructor(rut: string, enabled: boolean) {
        this.rut = rut;
        this.enabled = enabled;
    }

}

export default RequestPutUser;
