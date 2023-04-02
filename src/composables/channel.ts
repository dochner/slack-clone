import { Channel } from "~/types/channel";
import { ID } from "~/types/id";
import { Message } from "~/types/message";

const channels = ref<Channel[]>();
const currentChannel = ref<Channel>();

const messages = ref<Message[]>();

export const useChannel = () => {
  const supabase = useSupabase();

  const getChannels = async () => {
    try {
      const { data, error } = await supabase.from("channels").select("*");

      if (error) {
        throw error;
      }

      channels.value = data as Channel[];
    } catch (error) {}
  };

  const createChannel = async (slug: string, userId: ID) => {
    try {
      const { data, error } = await supabase
        .from("channels")
        .insert([{ slug, created_by: userId }])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      // TODO: remove console log
      console.log(error);
    }
  };

  const deleteChannel = async (channel_id: ID) => {
    try {
      const { data, error } = await supabase
        .from("channels")
        .delete()
        .match({ id: channel_id });

      if (error) throw error;
      return data;
    } catch (error) {
      // TODO: remove console log
      console.log(error);
    }
  };

  const getMessagesByChannelId = async (id: ID) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`*, author:user_id(*)`)
        .eq("channel_id", id)
        .order("inserted_at", { ascending: true });

      if (error) throw error;

      messages.value = data;
      return data;
    } catch (error) {
      // TODO: remove console log
      console.log(error);
    }
  };

  const addMessage = async ({ message, channel_id, user_id }: Message) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            message,
            channel_id,
            user_id,
          },
        ])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      // TODO: remove console log
      console.log(error);
    }
  };

  const deleteMessage = async (message_id: ID) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .delete()
        .match({ id: message_id });

      if (error) throw error;
      return data;
    } catch (error) {
      // TODO: remove console log
      console.log(error);
    }
  };

  return {
    channels,
    currentChannel,
    messages,
    addMessage,
    getMessagesByChannelId,
    deleteMessage,
    createChannel,
    getChannels,
    deleteChannel,
  };
};
