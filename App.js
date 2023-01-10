import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ResturantScreen from "./screens/ResturantScreen";
const Stack = createNativeStackNavigator();
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import PreparingScreen from "./screens/PreparingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Resturant" component={ResturantScreen} />
          <Stack.Screen name="Cart" component={CartScreen}  options={{presentation:"modal",headerShown:false}}/>
          <Stack.Screen name="Preparing" component={PreparingScreen} options={{presentation:"fullScreenModal",headerShown:false}} />
          <Stack.Screen name="Delivery" component={DeliveryScreen} options={{presentation:"fullScreenModal",headerShown:false}}  />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
