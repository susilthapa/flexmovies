import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";

const TabIcon = ({
  bgImage,
  title,
  focused,
  icon,
}: {
  bgImage: ImageSourcePropType;
  title: string;
  focused: boolean;
  icon: ImageSourcePropType;
}) => {
  return focused ? (
    <ImageBackground
      source={bgImage}
      className="flex flex-row flex-1 w-full min-w-[112px] min-h-[53px] mt-4 justify-center items-center rounded-full overflow-hidden"
    >
      <Image source={icon} className="size-5" tintColor={"#151312"} />
      <Text className="text-secondary text-base font-semibold">{title}</Text>
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} className="size-5" tintColor={"#A8B5DB"} />
    </View>
  );
};
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Home"
              icon={icons.home}
              bgImage={images.highlight}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Search"
              icon={icons.search}
              bgImage={images.highlight}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Saved"
              icon={icons.save}
              bgImage={images.highlight}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Profile"
              icon={icons.person}
              bgImage={images.highlight}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
