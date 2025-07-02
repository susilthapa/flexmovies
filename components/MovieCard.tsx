import { icons } from "@/constants/icons";
import { Movie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  movie: { id, poster_path, title, vote_average, release_date, ...rest },
}: {
  movie: Movie;
}) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%] relative">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placeholder.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
        />
        <Text className="text-white text-sm font-bold mt-1" numberOfLines={1}>
          {title}x
        </Text>
        <View className="flex-row items-center gap-x-1 absolute right-1 top-1 bg-blend-multiply bg-gray-700 px-1 py-0.5 rounded-full">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
