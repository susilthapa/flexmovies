import { AUTH_STORAGE_KEY } from "@/constants/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  login: () => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };
  const login = () => {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

        const storageValue = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (storageValue) {
          const authState = JSON.parse(storageValue) as { isLoggedIn: boolean };
          setIsLoggedIn(authState.isLoggedIn);
        }
      } catch (error) {
        console.log("Error while fetching storage data", error);
      }
      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};
