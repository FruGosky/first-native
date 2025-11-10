import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from '@/lib/appwrite';
import { getErrorMessage } from '@/helpers/getErrorMessage';

type TAuthContext = {
  user: Models.User | null;
  isLoadingUser: boolean;
  registerAndLogin: (email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<TAuthContext['user']>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const getUser = async (shouldDisplayError: boolean = true) => {
    setIsLoadingUser(true);
    try {
      const user = await account.get();
      setUser(user);
      setIsLoadingUser(false);
    } catch (error) {
      setUser(null);
      setIsLoadingUser(false);
      if (!shouldDisplayError) return;
      const errorMessage = getErrorMessage(error);
      console.error('Error fetching user: ', errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      await getUser(false);
    })();
  }, []);

  const login: TAuthContext['login'] = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession({ email, password });
      await getUser();
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const registerAndLogin: TAuthContext['registerAndLogin'] = async (
    email: string,
    password: string
  ) => {
    try {
      const createdUser = await account.create({ userId: ID.unique(), email, password });
      setUser(createdUser);
      await login(email, password);
      return null;
    } catch (error) {
      return getErrorMessage(error);
    }
  };

  const logout: TAuthContext['logout'] = async () => {
    try {
      await account.deleteSession({ sessionId: 'current' });
      setUser(null);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error('Error logging out: ', errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerAndLogin, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}
