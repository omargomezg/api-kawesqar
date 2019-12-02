import {HttpError} from "routing-controllers";

export class UndefinedArrayListError extends HttpError {
    constructor() {
        super(200, "[]");
    }
}
