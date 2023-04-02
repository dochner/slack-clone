import { ID } from "./id";
import { Role } from "./role";

export type User = {
  id: ID;
  username?: string;
  email?: string;
  status?: "OFFLINE" | "ONLINE";
};

export type UserSign = {
  username: string;
  password: string;
};
// export type UserRole = {
//   id: ID;
//   user_id: ID;
//   role?: Role;
// };

export type UserRole = "admin" | "moderator";
