import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useMemo, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectResturant } from "../features/resturantSlice";
import {
  ArrowLeftCircleIcon,
  CircleStackIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { CursorArrowRaysIcon } from "react-native-heroicons/outline";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { removeFromBasket, totalPrice } from "../features/basketSlice";

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const resturant = useSelector((state) => selectResturant(state));
  const itemsArray = useSelector((state) => state.basket);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const totalPayment = useSelector(totalPrice)

  useMemo(() => {
    const getGroupedItems = itemsArray.items.reduce((resultObj, item) => {
      (resultObj[item.id] = resultObj[item.id] || []).push(item);
      //resultObj holo akta empty object jekhane jodi item age exist na kore then oi item er id take "key" kore setar value te akta array rakha hobe ar sei array te
      // oi item ta push kora hobe ar jodi oi item ta agei exist korto then oi array te abar oi item ta add hobe
      // ex -
      // [
      //"123":["Burger"]...eta first order ,
      // erpor second order dilam abar burger ...  "123":["Burger","Burger"] ...
      //ebar third order sandwitch so... "123":["Burger","Burger"],"234":[Sandwitch]
      // ]
      return resultObj;
    }, {});

    setGroupedItemsInBasket(getGroupedItems);
  }, [itemsArray]);

  return (
    <SafeAreaView style={tw`pt-10 px-4 flex-1 `}>
      <View style={tw`flex-1 bg-gray-100`}>
        <View style={tw`relative border-b pb-2 border-gray-200 `}>
          <View>
            <Text style={tw`text-lg text-center font-bold`}>Cart</Text>
            <Text style={tw`text-lg text-center font-bold text-gray-600`}>
              {resturant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`absolute top-3 right-2`}
          >
            <XCircleIcon size={50} color="#5f3dc4" />
          </TouchableOpacity>
        </View>
        <View
          style={tw`flex-row items-center justify-between m-2 bg-white p-3 my-3 rounded-lg`}
        >
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: "https://links.papareact.com/wru" }}
              style={tw`h-7 w-7 bg-gray-300 p-5 rounded-full`}
            />
            <Text style={tw`text-gray-600 text-lg pl-2`}>
              Deliver in 40-50 mins
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={tw`text-indigo-700 text-sm font-bold underline`}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={tw`bg-white`}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={tw`flex-row  items-center p-3 bg-gray-100 m-2 rounded-sm`}
            >
              <Text style={tw`font-bold`}>{items.length} * </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={tw`h-12 w-12 rounded-full`}
              />
              <Text style={tw`font-bold flex-1 px-4`}>{items[0]?.name}</Text>
              <Text style={tw`font-bold p-2`}>
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>
              <TouchableOpacity>
                <Text onPress={()=>dispatch(removeFromBasket({id:key}))} style={tw`text-indigo-700`}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View >
          <View style={tw`flex-row items-center justify-between px-3 py-2`}>
            <Text style={tw`text-gray-500 font-bold`}>Subtotal</Text>
            <Text style={tw`text-gray-500`}>
            <Currency quantity={totalPayment} currency="INR" />
            </Text>
          </View>

          <View style={tw`flex-row items-center justify-between px-3 py-2`}>
            <Text style={tw`text-gray-500 font-bold`}>Delivery Fee</Text>
            <Text style={tw`text-gray-500`}>
            <Currency quantity={60.00} currency="INR" />
            </Text>
          </View>

          <View style={tw`flex-row items-center justify-between px-3 py-2`}>
            <Text style={tw`text-gray-900 font-bold`}>Order Total</Text>
            <Text style={tw`text-gray-900 font-bold`}>
            <Currency quantity={totalPayment+60} currency="INR" />
            </Text>
          </View>

          <TouchableOpacity style={tw`bg-indigo-700 p-5 rounded-lg mb-3`} onPress={()=>navigation.navigate("Preparing")}>
            <Text style={tw`text-white font-bold  text-center text-xl`}>Place Order</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
