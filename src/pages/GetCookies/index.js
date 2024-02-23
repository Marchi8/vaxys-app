import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { vh, vw } from "react-native-expo-viewport-units";
import * as Animatable from "react-native-animatable";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

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
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={3000}>
        <Text style={{ color: "#ffff" }}>
          Vaxys Utiliza Cookies para personalizar sua experiência;
        </Text>
        <Text style={{ color: "#ffff" }}>
          Clique no botão abaixo para permitir o uso de cookies.
        </Text>
      </Animatable.View>

      <TouchableOpacity
        style={{ backgroundColor: "#077067" }}
        onPress={getTrackPermission}
      >
        <Text style={{ color: "#ffff" }}>Permitir Cookies</Text>
      </TouchableOpacity>
    </View>
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
