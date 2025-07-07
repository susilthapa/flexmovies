import { Stack } from "expo-router";
import "./globals.css"; // Import global styles

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
