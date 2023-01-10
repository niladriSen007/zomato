import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { totalPrice } from "../../features/basketSlice";
import Currency from "react-currency-formatter";

const TotalBasket = () => {
  const totalItems = useSelector((state) => state.basket);
  const totalPriceOfItems = useSelector((state) => totalPrice(state));
  const navigation = useNavigation();

  if(totalItems.items.length === 0) return null;

  return (
    <View  style={tw`absolute bottom-5 right-5 left-4 w-full`}>
      <TouchableOpacity
        style={tw` w-90 z-50 bg-indigo-700 p-5 flex-row justify-between rounded-lg items-center`} 
        onPress={()=>navigation.navigate("Cart")}>
        <Text style={tw`text-white bg-indigo-800 p-3 rounded-sm font-bold`}>
          {totalItems.items.length}
        </Text>
        <Text style={tw`text-white font-bold text-xl`}>View Basket</Text>
        <Text style={tw`text-white mt-2 font-bold`}>
          <Currency quantity={totalPriceOfItems} currency="INR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TotalBasket;
