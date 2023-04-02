import { ID } from "./id";
import { User } from "./user";

export type Message = {
  id: ID;
  inserted_at: Date;
  message: string;
  user_id: ID;
  author: User;
  channel_id: ID;
};
