import { AuthContext } from "@/context/authContext";
import { Button } from "@react-navigation/elements";
import { Redirect } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";

const LoginPage = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  if (isLoggedIn) return <Redirect href="/" />;

  return (
    <View className="size-full justify-center items-center">
      <Text>LoginPage</Text>
      <Button className="mt-4" onPressIn={login}>
        Login
      </Button>
    </View>
  );
};

export default LoginPage;
