import { AuthContext } from "@/context/authContext";
import { Button } from "@react-navigation/elements";
import React, { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView>
        <View className="p-5 border size-full">
          <Text className="text-white tex-xl font-semibold">Profile</Text>
          <View className="flex-1 items-center justify-center">
            <Button onPressIn={logout}>Logout</Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
