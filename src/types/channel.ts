import { ID } from "./id";

export type Channel = {
  id: ID;
  inserted_at: Date;
  slug: string;
  created_by: ID;
};
