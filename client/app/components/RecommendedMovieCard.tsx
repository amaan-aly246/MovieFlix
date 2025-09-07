import { Link } from "expo-router";
import { Text, TouchableOpacity, Image } from "react-native";

const RecommendedMovieCard = ({
  id,
  title,
  poster_path
}: RecommendedMovie) => {

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5 mr-4">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default RecommendedMovieCard;
