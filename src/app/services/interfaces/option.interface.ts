import { RolI } from "./rol.interface";

export interface OptionI {
  option_id: number;
  optionName: string;
  roleList: RolI[];
}
