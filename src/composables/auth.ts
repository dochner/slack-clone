export const useAuth = () => {
  const { user } = useUser();

  const signIn = () => {};

  const signUp = () => {};

  const logout = () => {};

  return {
    logout,
    signIn,
    signUp,
  };
};
