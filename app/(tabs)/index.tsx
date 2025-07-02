import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";

const Index = () => {
  const [searchVal, setSearchVal] = useState("");

  const {
    data: trendingMovies = [],
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useFetch(() => getMovies({ query: "" }), true);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <SearchBar searchVal={searchVal} handleChange={setSearchVal} />
        {isTrendingLoading && (
          <ActivityIndicator
            size="large"
            className="mt-10 self-center text-blue-400"
          />
        )}
        {trendingError && (
          <Text className="text-red-500 font-semibold text-sm">
            Error while loading movies
          </Text>
        )}
        {!trendingError && !isTrendingLoading && (
          <View>
            <Text className="text-white text-lg font-bold my-5">
              Latest Movies
            </Text>
            <FlatList
              data={trendingMovies}
              renderItem={({ item }) => <MovieCard movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
