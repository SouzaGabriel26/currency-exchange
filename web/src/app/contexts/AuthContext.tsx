import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Spinner } from "../../view/components/Spinner";
import { localStorageKeys } from "../config/localStorageKeys";
import { usersService } from "../services/usersService";
import { MeResponse } from "../services/usersService/me";
import { TradeInterface } from "../utils/interfaces/tradeInterface";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  userData: MeResponse;
  updateUserTrades(data: TradeInterface): void;
  removeTrade(tradeId: string): void;
  refetchUserData(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const [userData, setUserData] = useState<MeResponse>({} as MeResponse);

  const {
    isLoading,
    error,
    refetch: refetchUserData,
    remove,
  } = useQuery({
    queryKey: "me",
    queryFn: () => usersService.me(),
    onSuccess: (data) => {
      setUserData(data);
    },
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();

    setSignedIn(false);
  }, [remove]);

  const updateUserTrades = useCallback((data: TradeInterface) => {
    setUserData((prevState) => ({
      ...prevState,
      trades: [...prevState.trades, data],
    }));
  }, []);

  const removeTrade = useCallback((tradeId: string) => {
    setUserData((prevState) => ({
      ...prevState,
      trades: prevState.trades.filter((trade) => trade.id !== tradeId),
    }));
  }, []);

  useEffect(() => {
    if (error) {
      toast.error("Sua sessão expirou!");
      signout();
    }
  }, [error, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: !error && signedIn,
        signin,
        signout,
        userData,
        updateUserTrades,
        removeTrade,
        refetchUserData,
      }}
    >
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          {" "}
          <Spinner className="w-12 h-12 dark:text-gray-200" />{" "}
        </div>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
