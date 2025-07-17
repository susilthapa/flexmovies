import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useContext, useState } from "react";

import { AuthUser } from "@/types/user";
import { AuthError } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: () => void;
  signOut: () => void;
  fetchWithAuth: (url: string, options: RequestInit) => Promise<any>;
};
export const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: false,
  error: null,
  signIn: () => {},
  signOut: () => {},
  fetchWithAuth: (url, options) => Promise.resolve(new Response()),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const signIn = () => {};
  const signOut = () => {};
  const fetchWithAuth = (url, options) => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,

        signIn,
        signOut,
        fetchWithAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  }
  throw new Error("useAuth must be used within an AuthProvider");
};
