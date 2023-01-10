import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../src/components/Categories";
import FeaturedRow from "../src/components/FeaturedRow";
import sanityClient from "../sanity"

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [featuredCategories,setFeaturedCategories] = useState([])

  useEffect(()=>{
    sanityClient.fetch(`*[_type == "featured"]{
      ...,
      resturants[]->{
        ...,
        dishes[]->
      }
    }`).then(data=>setFeaturedCategories(data))
  },[])

  // console.log(featuredCategories)

  return (
    <SafeAreaView style={tw`pt-10 bg-white `}>
      {/* //Header */}
      <View style={tw` flex-row mx-4  pb-3 items-center `}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`h-7 w-7 bg-gray-700 p-4 rounded-4 mr-2`}
        />
        <View style={tw`flex-1`}>
          <Text style={tw` text-gray-600 text-xs`}>Deliver now</Text>
          <Text style={tw` text-xl flex flex-row items-center`}>
            Current Location
            <ChevronDownIcon size={20} color="#5f3dc4" />
          </Text>
        </View>
        <UserIcon size={35} color="#5f3dc4" />
      </View>

      {/* //SearchBAR */}
      <View style={tw`flex flex-row items-center`}>
        <View
          style={tw`flex flex-row items-center bg-gray-100  flex-1 mx-3 my-2 p-2 rounded-l`}
        >
          <MagnifyingGlassIcon size={20} color="#5f3dc4" />
          <TextInput
            placeholder="Resturants and Fooods"
            keyboardType="default"
            style={tw`pl-1 text-indigo-700`}
          />
        </View>
        <AdjustmentsVerticalIcon size={30} color="#5f3dc4" />
      </View>

      {/* body */}
      <ScrollView>
        {/* categories */}
        <Categories />
        {/* FeaturedRows */}

    {
      featuredCategories?.map(category=>(
        <FeaturedRow
        key={category._id}
        id={category._id}
          title={category.name}
          description={category.short_description}
        />
      ))
    }

        {/* <FeaturedRow
        id="1"
          title="Featured"
          description="Paid placements from our partners"
        />

        <FeaturedRow
        id="2"
          title="Tasty Discounts%"
          description="Everyone's been enjoying the juicy discounts"
          f
        />

        <FeaturedRow
        id="3"
          title="Offers near you!"
          description="Why Not support your local resturant tonight"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
