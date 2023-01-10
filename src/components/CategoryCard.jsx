import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from "twrnc";

const CategoryCard = ({imgUrl,title}) => {
  return (
    <TouchableOpacity style={tw`mr-2 relative`}>
        <Image source={{uri:imgUrl}} style={tw`w-20 h-20 rounded-full` }/>
      <Text style={tw`absolute left-2 bottom-0 text-white font-bold bg-gray-900 p-1 rounded-full`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard