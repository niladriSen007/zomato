import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";

const ResturantCards = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Resturant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }
      style={tw`bg-gray-100 mr-3 shadow-sm`}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        style={tw`h-40 w-64 rounded-sm`}
      />
      <View style={tw`px-3 pb-4`}>
        <Text style={tw`font-bold text-lg pt-2`}>{title}</Text>
        <View style={tw`flex-row  items-center`}>
          <StarIcon size={25} color="#5f3dc4" opacity={0.9} />
          <Text style={tw`text-gray-500 text-sm pl-2`}>
            <Text style={tw`text-indigo-700 font-bold`}>{rating}</Text> *{" "}
            {genre}
          </Text>
        </View>

        <View style={tw`flex-row items-center`}>
          <MapPinIcon size={25} color="#5f3dc4" opacity={0.8} />
          <Text style={tw`text-sm text-gray-500  pl-2`}>
            Nearby · {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResturantCards;
