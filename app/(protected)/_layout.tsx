import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";

const ProtectedLayout = () => {
  const { user } = useAuth();

  console.log({ user: user ? "Home" : "Redirecting to login" });
  if (!user) return <Redirect href={"/login"} />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="movie/[id]"
        options={{
          headerShown: false,
          // presentation: "transparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
