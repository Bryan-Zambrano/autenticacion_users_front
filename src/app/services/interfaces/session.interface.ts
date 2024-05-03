import { UserI } from "./user.interface";

export interface SessionI {
  session_id: number;
  sessionConnectionStart: Date;
  sessionConnectionEnd: Date;
  sessionUser: UserI;
}
