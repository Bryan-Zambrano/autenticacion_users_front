import { PersonI } from "./person.interface";
import { RolI } from "./rol.interface";

export interface UserI {
  id: number;
  username: string;
  password: string;
  userEmail: string;
  userIsActive: boolean;
  statusUser: boolean;
  userPerson: PersonI;
  rolList: RolI[];
}

export interface LogLoginI {
  id: number;
  logDate: Date;
  logStatus: boolean;
  logUser: UserI;
}
