import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { vh, vw } from "react-native-expo-viewport-units";
import * as Animatable from "react-native-animatable";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import adaptive_icon from "../../../assets/adaptive-icon.png";

export default function GetCookies({ navigation }) {
  const getTrackPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        let { status: trackStatus } = await requestTrackingPermissionsAsync();

        if (trackStatus !== "granted") {
          console.log("Não tenho permissão do usuário para rastrear dados");

          await requestTrackingPermissionsAsync();
        }
        if (trackStatus === "granted") {
          console.log("Yay! Tenho permissão do usuário para rastrear dados");

          return navigation.navigate("Home");
        }
      }
    } catch (e) {
      return e;
    }
  };

  return (
    <Animatable.View
      style={styles.container}
      animation="fadeIn"
      duration={3000}
    >
      <Image
        style={{ width: 180, height: 70, top: 40, position: "absolute" }}
        source={adaptive_icon}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          height: 200,
          width: 300,
          marginBottom: 50,
          marginTop: 80,
        }}
      >
        <Text
          style={{
            color: "#ffff",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 50,
            fontWeight: "700",
          }}
        >
          Vaxys Utiliza Cookies para personalizar sua experiência;
        </Text>
        <Text
          style={{
            color: "#ffff",
            fontSize: 19,
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Clique no botão abaixo para permitir o uso de cookies.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#077067",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: 200,
          height: 45,
          borderRadius: 10,
        }}
        onPress={getTrackPermission}
      >
        <Text
          style={{
            color: "#ffff",
            fontSize: 19,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Permitir Cookies
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
    width: vw(100),
    height: vh(100),
  },
  logo: {
    width: 124,
    height: 158,
  },
});
