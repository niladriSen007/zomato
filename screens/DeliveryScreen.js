import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectResturant, setResturant } from "../features/resturantSlice";
import {
  DevicePhoneMobileIcon,
  FaceSmileIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";


const DeliveryScreen = () => {
  const navigation = useNavigation();
  const resturant = useSelector((state) => selectResturant(state));

  return (
    <View style={tw`flex-1 bg-indigo-700 py-16 px-2 relative`}>
      <SafeAreaView style={tw`z-50`}>
        <View style={tw`flex-row items-center justify-between px-3 mb-7`}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon size={40} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-xl`}>Order Help</Text>
        </View>
        <View>
          <View
            style={tw`bg-white p-6 mx-3 rounded-md z-50 flex-row justify-between items-center`}
          >
            <View>
              <Text style={tw`text-lg text-gray-400`}>Estimated Arrival</Text>
              <Text style={tw`text-3xl font-bold py-3`}>40-55 minutes</Text>
              <Progress.Bar
                progress={0.3}
                width={200}
                color="#5f3dc4"
                indeterminate={true}
              />
              <Text style={tw`text-gray-400 py-3 text-sm w-50`}>
                Your order from {resturant.title} is on the way
              </Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              style={tw`h-25 w-25`}
            />
          </View>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: resturant.lat,
          longitude: resturant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
        style={tw`h-150 w-100 absolute top-60`}
        showsUserLocation={true}
        showsBuildings={true}
        showsCompass={true}
        showsMyLocationButton={true}
        showsTraffic={true}
      >
        <Marker 
          coordinate={{
            latitude:resturant.lat,
            longitude:resturant.long
          }}
          title={resturant.title}
          description={resturant.short_description}
          identifier="origin"
          pinColor="#5f3dc4"
        />
</MapView>
      <SafeAreaView
        style={tw`z-50 bg-white absolute bottom-0 w-100 p-5  rounded-lg flex-row justify-between`}
      >
        <View>
          <View style={tw`flex-row my-1 items-center `}>
            <FaceSmileIcon size={24} color="black" />
            <Text style={tw`text-black font-bold text-xl pl-2`}>Niladri Sen <Text style={tw`text-gray-400 text-sm`}>(Your Rider)</Text></Text>
          </View>
          <View style={tw`flex-row  items-center`}>
            <DevicePhoneMobileIcon size={24} color="black" />
            <Text style={tw`text-black font-bold text-xl pl-2 items-center`}>
              8874641251
            </Text>
          </View>
          <TouchableOpacity style={tw`bg-indigo-700 w-80 ml-1 my-3 flex-row justify-center items-center p-3 rounded-lg`}>
            <Text style={tw`text-white text-xl font-bold`}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Progress.Pie
            progress={0.3}
            color="#5f3dc4"
            indeterminate={true}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
