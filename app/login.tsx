import { useAuth } from "@/context/auth";
import { Button } from "@react-navigation/elements";
import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const LoginPage = () => {
  const { user, signIn } = useAuth();

  if (user) return <Redirect href="/" />;

  return (
    <View className="size-full justify-center gap-4 items-center">
      <Text className="font-semibold text-xl">Login</Text>
      <Button className="mt-4 font-semibold" onPressIn={signIn}>
        Sign with Google
      </Button>
    </View>
  );
};

export default LoginPage;
