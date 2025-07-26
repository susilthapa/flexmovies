import * as WebBrowser from "expo-web-browser";
import * as jose from "jose";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { BASE_URL, TOKEN_KEY_NAME } from "@/constants/auth";
import { AuthUser } from "@/types/user";
import { tokenCache } from "@/utils/cache";
import {
  AuthError,
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { usePathname } from "expo-router";
import { Platform } from "react-native";

// helps us to direct user to the Google
WebBrowser.maybeCompleteAuthSession();

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: () => void;
  signOut: () => void;
};
export const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: false,
  error: null,
  signIn: () => {},
  signOut: () => {},
});

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
};

// Our OAuth flow uses a server‑side approach for enhanced security:
// 1. Client initiates OAuth flow with Google through our server.
// 2. Google redirects to our server’s `/api/auth/authorize` endpoint.
// 3. Our server handles the OAuth flow with Google using server‑side credentials.
// 4. Client receives an authorization code from our server.
// 5. Client exchanges the code for tokens through our server.
// 6. Server uses its credentials to get tokens from Google and returns them to the client.

const discovery: DiscoveryDocument = {
  // URL where users are redirected to log in and grant authorization.
  // Our server handles the OAuth flow with Google and returns the authorization code here.
  authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,

  // URL where our server exchanges the authorization code for tokens.
  // Our server uses its own credentials (client ID and secret) to securely exchange
  // the authorization code with Google and return access and refresh tokens to the client.
  tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

const isWeb = Platform.OS === "web";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  async function handleResponse() {
    // This function is called when Google redirects back to our app
    // The response contains the authorization code that we'll exchange for tokens
    if (response?.type === "success") {
      try {
        setIsLoading(true);
        // Extract the authorization code from the response
        // This code is what we'll exchange for access and refresh tokens
        const { code } = response.params;

        // Create form data to send to our token endpoint
        // We include both the code and platform information
        // The platform info helps our server handle web vs native differently
        const formData = new FormData();
        formData.append("code", code);

        // Add platform information for the backend to handle appropriately
        if (isWeb) {
          formData.append("platform", "web");
        }

        console.log("request", request);

        // Get the code verifier from the request object
        // This is the same verifier that was used to generate the code challenge
        if (request?.codeVerifier) {
          formData.append("code_verifier", request.codeVerifier);
        } else {
          console.warn("No code verifier found in request object");
        }

        // Send the authorization code to our token endpoint
        // The server will exchange this code with Google for access and refresh tokens
        // For web: credentials are included to handle cookies
        // For native: we'll receive the tokens directly in the response
        const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
          method: "POST",
          body: formData,
          credentials: isWeb ? "include" : "same-origin", // Include cookies for web
        });

        if (isWeb) {
          // For web: The server sets the tokens in HTTP-only cookies
          // We just need to get the user data from the response
          const userData = await tokenResponse.json();
          console.log({ userData });
          if (userData.success) {
            // Fetch the session to get user data
            // This ensures we have the most up-to-date user information
            const sessionResponse = await fetch(
              `${BASE_URL}/api/auth/session`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            if (sessionResponse.ok) {
              const sessionData = await sessionResponse.json();
              setUser(sessionData as AuthUser);
            }
          }
        } else {
          // For native: The server returns both tokens in the response
          // We need to store these tokens securely and decode the user data
          const tokens = await tokenResponse.json();
          const accessToken = tokens.accessToken;
          if (!accessToken) {
            console.log("missing access token");
            return;
          }
          setAccessToken(accessToken);
          // save token to local storage
          tokenCache?.saveToken(TOKEN_KEY_NAME, accessToken);

          // get user info
          const decoded = jose.decodeJwt(accessToken);
          setUser(decoded as AuthUser);
          // await handleNativeTokens(tokens);
        }
      } catch (e) {
        console.error("Error handling auth response:", e);
      } finally {
        setIsLoading(false);
      }
    } else if (response?.type === "cancel") {
      alert("Sign in cancelled");
    } else if (response?.type === "error") {
      setError(response?.error as AuthError);
    }
  }

  const signIn = async () => {
    try {
      if (!request) {
        console.log("No request");
        return;
      }
      await promptAsync();
    } catch {}
  };

  const signOut = async () => {
    if (isWeb) {
      // For web: Call logout endpoint to clear the cookie
      try {
        await fetch(`${BASE_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Error during web logout:", error);
      }
    } else {
      // For native: Clear both tokens from cache
      await tokenCache?.deleteToken("accessToken");
      await tokenCache?.deleteToken("refreshToken");
    }

    // Clear state
    setUser(null);
    setAccessToken(null);
    // setRefreshToken(null);
  };

  useEffect(() => {
    handleResponse();
  }, [response]);

  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true);
      try {
        if (isWeb) {
          // For web: Check if we have a session cookie by making a request to a session endpoint
          const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`, {
            method: "GET",
            credentials: "include", // Important: This includes cookies in the request
          });

          if (sessionResponse.ok) {
            const userData = await sessionResponse.json();
            setUser(userData as AuthUser);
          }

          // TODO: REFRESH logic
          // else {
          //   console.log("No active web session found");

          //   // Try to refresh the token using the refresh cookie
          //   try {
          //     await refreshAccessToken();
          //   } catch (e) {
          //     console.log("Failed to refresh token on startup");
          //   }
          // }
        } else {
          // For native: Try to use the stored access token first
          const storedAccessToken = await tokenCache?.getToken(TOKEN_KEY_NAME);
          // const storedRefreshToken = await tokenCache?.getToken(REFRESH_COOKIE_NAME);

          console.log(
            "Restoring session - Access token:",
            storedAccessToken ? "exists" : "missing"
          );
          console.log(
            "Restoring session - Refresh token:"
            // storedRefreshToken ? "exists" : "missing"
          );

          if (storedAccessToken) {
            try {
              // Check if the access token is still valid
              const decoded = jose.decodeJwt(storedAccessToken);
              const exp = (decoded as any).exp;
              const now = Math.floor(Date.now() / 1000);

              if (exp && exp > now) {
                // Access token is still valid
                console.log("Access token is still valid, using it");
                setAccessToken(storedAccessToken);

                setUser(decoded as AuthUser);
              } else {
                setUser(null);
                tokenCache?.deleteToken(TOKEN_KEY_NAME);
              }
            } catch (e) {
              console.error("Error decoding stored token:", e);
            }
          } else {
            console.log("User is not authenticated");
          }
        }
      } catch (error) {
        console.error("Error restoring session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [isWeb, pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,

        signIn,
        signOut,
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
