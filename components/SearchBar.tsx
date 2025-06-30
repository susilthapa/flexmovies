import { icons } from "@/constants/icons";
import React, { useState } from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = () => {
  const [searchVal, setSearchVal] = useState("");

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
        onChangeText={setSearchVal}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
