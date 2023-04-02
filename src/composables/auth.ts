import { Router } from "vue-router";
import { UserSign } from "~/types/user";

const session = ref();

export const useAuth = () => {
  const { user, getUserRoles } = useUser();
  const router = useRouter();
  const supabase = useSupabase();

  const signIn = async ({ username, password }: UserSign) => {
    try {
      const {
        error,
        data: { user: authUser },
      } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) throw error;

      if (authUser) user.value = authUser;
    } catch (error) {
      // TODO: Implement Notify system
      console.log(error);
    }
  };

  const signUp = async ({ username, password }: UserSign) => {
    try {
      const {
        error,
        data: { user: authUser },
      } = await supabase.auth.signUp({ email: username, password });
      if (error) throw error;

      if (authUser) user.value = authUser;
    } catch (error) {
      // TODO: Implement Notify system
      console.log(error);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  return {
    logout,
    signIn,
    signUp,
    session,
    isAuthenticated: computed(() => !!user.value),
  };
};
