import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingScreen = () => {

  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("Delivery")
    },3000)
  })

  return (
    <SafeAreaView style={tw`bg-[#252c80] flex-1 justify-center items-center`}>
      <Animatable.Image
        source={require("../assets/food.gif")}
        animation="slideInUp"
        iterationCount={2}
        style={tw`h-64 w-64 `}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={2}
        style={tw`text-white font-bold py-5 text-2xl`}
      >
        Preparing your order...
      </Animatable.Text>
      <Progress.Bar   progress={0.8} width={200} indeterminate={true} color="white"/>
    </SafeAreaView>
  );
};

export default PreparingScreen;
