import { ID } from "./id";

export type Message = {
  id: ID;
  inserted_at: Date;
  message: string;
  user_id: ID;
  channel_id: ID;
};
