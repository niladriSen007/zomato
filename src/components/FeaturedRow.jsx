import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCards from "./ResturantCards";
import sanityClient from "../../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id==$id]{
      ...,
      resturants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      },
    }[0]
    `,
        { id }
      )
      .then((data) => setResturants(data?.resturants));
  }, [id]);

  // console.log(resturants)

  return (
    <View>
      <View style={tw`flex-row items-center justify-between mt-4 px-4`}>
        <Text style={tw`font-bold text-black text-xl`}>{title}</Text>
        <ArrowRightIcon size={25} color="#5f3dc4" />
      </View>
      <Text style={tw`text-xs text-gray-500 px-4`}>{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        style={tw`pt-4`}
      >
        {/* ResturantCards */}

        {resturants?.map((resturant) => (
          <ResturantCards
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image}
            title={resturant.name}
            rating={resturant.rating}
            genre={resturant.type?.name}
            address={resturant.address}
            short_description={resturant.short_description}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
        {/* <ResturantCards
          id={1}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="Sripur"
          short_description="Test Desc"
          dishes={[]}
          long={20}
          lat={0}
        />

<ResturantCards
          id={1}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="Sripur"
          short_description="Test Desc"
          dishes={[]}
          long={20}
          lat={0}
        />

<ResturantCards
          id={1}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="Sripur"
          short_description="Test Desc"
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
