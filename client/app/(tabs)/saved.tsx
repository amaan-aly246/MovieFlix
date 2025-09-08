import { useAuth } from "@/hooks/useAuth";
import { useUserContext } from "@/hooks/useUserContext";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import useFetch from "../../hooks/useFetch";
import { getFavMovies } from "../../services/api";
import MovieCard from "../components/MovieCard";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
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
            <View className="mt-20">
              <Text className="text-xl text-white font-bold mt-10 ml-5">
                Watchlist
              </Text>
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

export default ProtectedRoutes(saved);
