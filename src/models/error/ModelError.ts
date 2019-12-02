import {HttpError} from "routing-controllers";

export class ModelError extends HttpError {
    public operationName: string;
    public args: any[];

    constructor(operationName: string, args: any[] = []) {
        super(500);
        Object.setPrototypeOf(this, ModelError.prototype);
        this.operationName = operationName;
        this.args = args; // can be used for internal logging
    }

    toJSON() {
        return {
            failedOperation: this.operationName,
            status: this.httpCode
        };
    }
}
