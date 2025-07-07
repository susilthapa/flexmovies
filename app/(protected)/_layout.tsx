import { AuthContext } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

const ProtectedLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) return <Redirect href={"/login"} />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProtectedLayout;
