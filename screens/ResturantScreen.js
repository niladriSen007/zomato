import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { urlFor } from "../sanity";
import tw from "twrnc";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishItem from "../src/components/DishItem";
import TotalBasket from "../src/components/TotalBasket";
import { useDispatch } from "react-redux";
import { setResturant } from "../features/resturantSlice";

const ResturantScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const {
    params: {
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
    },
  } = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setResturant({
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
    )
  }, [dispatch]);

  return (
    <>
      <TotalBasket />
      <ScrollView style={tw`bg-gray-200`}>
        <View style={tw`relative`}>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            style={tw`w-full h-60 bg-gray-300 p-4`}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw` absolute top-12 left-5 p-2 bg-white rounded-full`}
          >
            <ArrowLeftIcon size={20} color="#5f3dc4" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={tw`px-4 pt-4 bg-white`}>
            <Text style={tw`text-3xl font-bold`}>{title}</Text>
            <View style={tw`flex-row my-1`}>
              <View style={tw`flex-row my-1 items-center`}>
                <StarIcon color="#5f3dc4" size={22} opacity={0.9} />
                <Text style={tw`text-xs text-gray-400`}>
                  <Text style={tw`pl-1 text-indigo-700 text-sm`}>
                    {" "}
                    {rating}{" "}
                  </Text>{" "}
                  * {genre}
                </Text>
              </View>
              <View style={tw`flex-row my-1 items-center pl-2`}>
                <MapPinIcon color="#5f3dc4" size={22} opacity={0.9} />
                <Text style={tw`text-xs text-gray-400`}> {address} </Text>
              </View>
            </View>
            <Text style={tw`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
          </View>
          <TouchableOpacity
            style={tw`flex-row items-center p-4 border border-gray-300 bg-white`}
          >
            <QuestionMarkCircleIcon color="#5f3dc4" size={22} opacity={0.9} />
            <Text style={tw`pl-2 flex-1 text-sm font-bold`}>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#5f3dc4" size={22} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={tw`px-4 pt-6 mb-3 font-bold text-xl`}>Menu</Text>
          {/* Dishes */}
          <View style={tw`pb-40`}>
            {dishes.map((dish) => (
              <DishItem
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ResturantScreen;
