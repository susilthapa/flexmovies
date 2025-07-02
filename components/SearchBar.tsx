import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = ({
  searchVal,
  handleChange,
}: {
  searchVal: string;
  handleChange: (val: string) => void;
}) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        value={searchVal}
        placeholder="Search"
        placeholderTextColor={"#a8b5db"}
        onChangeText={handleChange}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
