import { createContext, useState, useCallback, useEffect } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { usersService } from '../services/usersService';
import toast from 'react-hot-toast';
import { Spinner } from '../../view/components/Spinner';

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const [errorGetUser, setErrorGetUser] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  async function getUserData() {
    setIsFetching(true);
    try {
      const user = await usersService.me();

      setErrorGetUser(false);
      return user;
    } catch {
      setErrorGetUser(true);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (signedIn) {
      getUserData();
    }
  }, [signedIn]);

  useEffect(() => {
    if (errorGetUser) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [errorGetUser, signout]);

  return (
    <AuthContext.Provider value={{
      signedIn: !errorGetUser && signedIn,
      signin,
      signout
    }}>
      { isFetching && <div className="w-full h-full flex items-center justify-center"> <Spinner className='w-12 h-12 dark:text-gray-200'/> </div> }
      { !isFetching && children }
    </AuthContext.Provider>
  )
}
