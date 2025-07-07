import { AuthContextProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import "./globals.css"; // Import global styles

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen
          name="(protected)"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
    </AuthContextProvider>
  );
}
