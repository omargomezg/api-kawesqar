import {HttpError} from "routing-controllers";

export class UndefinedArrayError extends HttpError {
    constructor() {
        super(200, "{}");
    }
}
