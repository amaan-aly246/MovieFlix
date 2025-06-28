import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUserContext";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import useFetch from "../../hooks/useFetch";
import { getFavMovies } from "../../services/api";
import MovieCard from "../components/MovieCard";
const saved = () => {
  const { userId } = useAuth();
  const { setWatchList } = useUserContext();

  const {
    data: movies,
    loading,
    error,
    refetch,
  } = useFetch(() => getFavMovies(userId, setWatchList));
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
        className="px-0"
        refreshing={loading}
        onRefresh={refetch}
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
              <Text className=" text-xl font-bold mx-5 text-white ">
                No movies in the wishlist.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default saved;
