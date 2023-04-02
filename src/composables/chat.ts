import { Channel } from "~/types/channel";
import { ID } from "~/types/id";
import { Message } from "~/types/message";
import { User } from "~/types/user";

export const useChat = () => {
  const supabase = useSupabase();
  const { channels, messages, currentChannel, getMessagesByChannelId } =
    useChannel();
  const { users, getUserById } = useUser();

  const usersList = ref(new Map<ID, User>());
  const newMessage = ref<Message>();
  const deletedMessage = ref<Message>();
  const newUser = ref<User>();
  const newChannel = ref<Channel>();
  const deletedChannel = ref<Channel>();
  const newOrUpdateUser = ref<User>();

  const messageListener = supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => (newMessage.value = payload.new as Message)
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "messages" },
      (payload) => (deletedMessage.value = payload.old as Message)
    )
    .subscribe();

  const userListener = supabase
    .channel("public:users")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "users" },
      (payload) => (newUser.value = payload.new as User)
    )
    .subscribe();

  const channelListener = supabase
    .channel("public:channels")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "channels" },
      (payload) => (newChannel.value = payload.new as Channel)
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "channels" },
      (payload) => (deletedChannel.value = payload.old as Channel)
    )
    .subscribe();

  // Update when the route changes
  watch(
    () => currentChannel.value?.id,
    async (channelId) => {
      if (channelId) {
        await getMessagesByChannelId(channelId).then((newMessages) => {
          if (newMessages) {
            messages.value = newMessages as Message[];
          }
        });
      }
    }
  );

  // New message received from Postgres
  watch(newMessage, (message) => {
    if (message && message.channel_id === Number(currentChannel.value?.id)) {
      const handleNewMessage = async () => {
        const authorId = message.user_id;

        if (!users.value?.find((user) => user.id === authorId)) {
          await getUserById(authorId).then((user) => {
            newOrUpdateUser.value = user;
          });
        }
        messages.value?.concat(message);
      };
      handleNewMessage();
    }
  });

  // Deleted message received from postgres
  watch(deletedMessage, (newDeletedMessage) => {
    if (newDeletedMessage) {
      messages.value = messages.value?.filter(
        (message) => message.id !== newDeletedMessage.id
      );
    }
  });

  // New channel received from Postgres
  watch(newChannel, (newChannelAdded) => {
    if (newChannelAdded) {
      channels.value = channels.value?.concat(newChannelAdded);
    }
  });

  // Deleted channel received from postgres
  watch(deletedChannel, (newDeletedChannel) => {
    if (newDeletedChannel) {
      channels.value = channels.value?.filter(
        (channel) => channel.id !== newDeletedChannel.id
      );
    }
  });

  // New or updated user received from Postgres
  watch(newOrUpdateUser, (newUser) => {
    if (newUser) {
      usersList.value.set(newUser.id, newUser);
    }
  });

  onBeforeUnmount(() => {
    supabase.removeChannel(messageListener);
    supabase.removeChannel(userListener);
    supabase.removeChannel(channelListener);
  });

  return {
    messageList: computed(() =>
      messages.value?.map((m) => ({
        ...m,
        author: usersList.value.get(m.user_id),
      }))
    ),
    channelsList: computed(
      () => channels.value?.sort((a, b) => a.slug.localeCompare(b.slug)) || []
    ),
    usersList,
  };
};
