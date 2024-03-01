import * as React from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { vh, vw } from "react-native-expo-viewport-units";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import adaptive_icon from "../../../assets/adaptive-icon.png";

export default function GetPushNotifications({ navigation }) {
  const getPushPermission = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true,
      }),
    });

    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        navigation.navigate("GetCookies");
      }

      if (status.status == "denied") {
        Notifications.requestPermissionsAsync();
        Alert.alert(
          "Ir para configurações",
          "Como você não permitiu o envio de notificações anteriormente, é necessário permitir nas configurações do seu dispositivo",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => Linking.openURL("app-settings:") },
          ]
        );
      }

      return;
    });
  };

  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  const handleCallNotification = async () => {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      return;
    }
    return token;
  };

  console.log("expoPushToken ==>", expoPushToken);

  React.useEffect(() => {
    handleCallNotification().then((token) => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
        animation="zoomIn"
        duration={3000}
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
          Vaxys deseja enviar notificações;
        </Text>
        <Text
          style={{
            color: "#ffff",
            fontSize: 19,
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Clique abaixo para permitir o envio de notificações para seu
          dispositivo.
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
        onPress={getPushPermission}
      >
        <Text
          style={{
            color: "#ffff",
            fontSize: 19,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Permitir notificações
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
