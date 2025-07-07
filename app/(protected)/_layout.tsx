import { AuthContext } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

const ProtectedLayout = () => {
  const { isLoggedIn, isReady } = useContext(AuthContext);

  if (!isReady) return null;
  if (!isLoggedIn) return <Redirect href={"/login"} />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
