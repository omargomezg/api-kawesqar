import Person from "./person.model";
import User from "./user/user.model";
import RequestPutUser from "./user/user.update.model";

export class CreateUserModel extends User { }
export class UpdateUserModel extends User { }
export class EnabledUserModel extends RequestPutUser { }
