import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../../services/api";
import useFetch from "../../services/useFetch";
const saved = () => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  // useEffect(() => {
  //   if (movies) {
  //     console.log("movies  ", movies[0].id);
  //   }
  // }, [movies]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        ListHeaderComponent={
          <>
            <View className=" w-full flex-row justify-center items-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View>
              <Text className="text-xl text-white font-bold mt-10 ml-5">
                Watchlist
              </Text>
            </View>
            <View>
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}
            </View>
            {error && (
              <Text className=" text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View>
              <Text>
                No movies in the wishlist. Go to home to add movies to the
                wishlist
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default saved;
