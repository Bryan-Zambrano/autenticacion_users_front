import { PersonI } from "./person.interface";
import { RolI } from "./rol.interface";

export interface UserI {
  user_id: number;
  userName: string;
  userPassword: string;
  userEmail: string;
  userIsActive: boolean;
  statusUser: boolean;
  userPerson: PersonI;
  rolList: RolI[];
}
