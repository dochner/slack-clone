import { ID } from "./id";
import { Role } from "./role";

export type User = {
  id: ID;
  username: string;
  status: "OFFLINE" | "ONLINE";
};

export type UserRole = {
  id: ID;
  user_id: ID;
  role?: Role;
};
