import { ID } from "./id";

export type Role = "admin" | "moderator" | undefined;

export type RolePermission = {
  id: ID;
  role: Role;
  permission: string;
};
