import { AuthProvider } from "@/context/auth";
import { Stack } from "expo-router";
import "./globals.css"; // Import global styles

export default function RootLayout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
