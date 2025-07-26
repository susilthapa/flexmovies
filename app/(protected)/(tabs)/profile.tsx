import { useAuth } from "@/context/auth";
import { Button } from "@react-navigation/elements";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const Profile = () => {
  const { signOut, user } = useAuth();
  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView>
        <View className="p-5 border size-full">
          <Text className="text-white tex-xl font-semibold">Profile</Text>
          <View className="mt-4 font-medium">
            <Text className="text-white">Hi, {user?.given_name}</Text>
            <Text className="text-white">{user?.email}</Text>
          </View>
          <View className="flex-1 items-center justify-center mt-10">
            <Button onPressIn={signOut}>Logout</Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
