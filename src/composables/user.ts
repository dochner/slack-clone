import { ID } from "~/types/id";
import { User, UserRole } from "~/types/user";

const user = ref<User>();
const users = ref<User[]>();
const userRoles = ref<UserRole[]>();

export const useUser = () => {
  const supabase = useSupabase();

  const getUserRoles = async () => {
    try {
      const { data, error } = await supabase.from("user_roles").select(`*`);

      if (error) throw error;

      userRoles.value = data as unknown as UserRole[];

      return data;
    } catch (error) {
      // TODO: Remove console log
      console.log(error);
    }
  };

  const getUserById = async (id: ID) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(`*`)
        .eq("id", id);

      if (error) throw error;
      return data[0] as User;
    } catch (error) {
      // TODO: Remove console log
      console.log(error);
    }
  };

  return { user, userRoles, users, getUserRoles, getUserById };
};
