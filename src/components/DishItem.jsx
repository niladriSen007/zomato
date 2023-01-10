import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import Currency from "react-currency-formatter";
import { urlFor } from "../../sanity";
import { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket,selectBasketWithId,removeFromBasket } from "../../features/basketSlice";

const DishItem = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();

  const addItemToBasket = () =>{
    dispatch(addToBasket({id,name,description,price,image}))
  }


  const removeItemsFromBasket = () =>{
    if(itemsWithSpecificId.length<=0) return;
    dispatch(removeFromBasket({id}))
  }

  const totalBasketItems = useSelector(state=>state.basket)

  const itemsWithSpecificId = useSelector(state=>selectBasketWithId(state,id))

  return (
    <View style={tw`bg-white border border-gray-200`}>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={tw`flex-row p-4 mt-3 items-center`}
      >
        <View style={tw`w-70 pr-4`}>
          <Text style={tw`text-lg mb-1 font-bold`}>{name}</Text>
          <Text style={tw`text-gray-500`}>{description}</Text>
          <Text style={tw`text-gray-600 mt-2`}>
            <Currency quantity={price} currency="INR" />
          </Text>
        </View>
        <View style={tw`flex-1`}>
          <Image
            source={{ uri: urlFor(image).url() }}
            style={tw`h-20 w-20 bg-gray-300 p-4 rounded-l border border-gray-200 `}
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={tw` py-2 px-3`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={removeItemsFromBasket} disabled={!itemsWithSpecificId.length}>
              <MinusCircleIcon size={40} color="#5f3dc4" />
            </TouchableOpacity>
            <Text style={tw`text-black px-2`}>{itemsWithSpecificId.length}</Text>
            <TouchableOpacity onPress={()=>addItemToBasket()}>
              <PlusCircleIcon size={40} color="#5f3dc4" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default DishItem;
