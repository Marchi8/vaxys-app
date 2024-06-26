import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";
import GetCookies from "./src/pages/GetCookies";
import GetPushNotifications from "./src/pages/GetPushNotifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer useLegacyImplementation={true}>
      <StatusBar
        style={Platform.OS == "ios" ? "default" : "light"}
        backgroundColor="#077067"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetCookies"
          component={GetCookies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetPushNotifications"
          component={GetPushNotifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
