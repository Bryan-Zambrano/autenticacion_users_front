import { UserI } from "./user.interface";
import { OptionI } from "./option.interface";


export interface RolI {
  rol_id: number;
  rolName: string;
  optionList: OptionI[];
  userList: UserI[];
}
