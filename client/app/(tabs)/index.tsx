import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import useFetch from "../../hooks/useFetch";
import { fetchMovies, getFavMovies, getReccMovies, getReccMoviesDetails } from "../../services/api";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUserContext";
import { useAuth } from "@/hooks/useAuth";
import RecommendedMovieCard from "../components/RecommendedMovieCard";
export default function Index() {
  const { watchList, setWatchList } = useUserContext()
  const { userId } = useAuth()
  const [reccMoviesDetails, setReccMoviesDetails] = useState<MovieDetails[]>([]);
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  useEffect(() => {
    const init = async () => {
      if (!userId) return;
      await getFavMovies(userId, setWatchList); // fills watchList
    };

    init();
  }, [userId]);

  if (userId) {

    // re-fetch fav movies when user navigate to home page
    getFavMovies(userId, setWatchList)
  }

  useEffect(() => {
    if (watchList.length === 0) return;

    const fetchRecommended = async () => {
      const reccMoviesIds = await getReccMovies(userId, watchList);
      if (reccMoviesIds && reccMoviesIds.length > 0) {
        const details = await getReccMoviesDetails(reccMoviesIds);
        setReccMoviesDetails(details);
      }
    };

    fetchRecommended();
  }, [watchList]);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Error : {error?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              {
                reccMoviesDetails && reccMoviesDetails.length > 0 &&
                <>
                  <Text className="text-lg text-white font-bold mt-5 mb-3">
                    Movies for you
                  </Text>
                  <FlatList
                    data={reccMoviesDetails}
                    renderItem={({ item }) => {
                      const { id, title, poster_path } = item;
                      return <RecommendedMovieCard id={id} title={title} poster_path={poster_path} />;
                    }}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                  />
                </>
              }
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              { /*  testing purposes */}
              {/* <TouchableOpacity className="border bg-purple-200 mx-auto py-5  " onPress={() => { */}
              {/*   getReccMovies(userId, watchList) */}
              {/* }}> */}
              {/*   <Text className="text-black ">Fetch recommended movies</Text> */}
              {/* </TouchableOpacity> */}
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
