import * as React from "react";
import { StyleSheet, View } from "react-native";
import { vh, vw } from "react-native-expo-viewport-units";
import * as Animatable from "react-native-animatable";
import Splash_logo from "../../../assets/Splash_logo.js";

export default function Splash({ navigation }) {
  const redirectUser = async () => {
    setTimeout(() => {
      navigation.navigate("Home");
      // navigation.navigate("GetCookies");
    }, 2000);
  };

  React.useEffect(() => {
    redirectUser();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={3000}>
        <Splash_logo />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#077067",
    width: vw(100),
    height: vh(100),
  },
  logo: {
    width: 124,
    height: 158,
  },
});
