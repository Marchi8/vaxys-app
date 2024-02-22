import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { vh, vw } from "react-native-expo-viewport-units";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

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
      console.log(status);

      if (status.granted) {
        navigation.navigate("GetCookies");
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
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={3000}>
        <Text style={{ color: "#ffff" }}>
          Vaxys deseja enviar notificações sobre atualizações;
        </Text>
        <Text style={{ color: "#ffff" }}>
          Clique no botão para permitir o envio de notificações para seu
          dispositivo.
        </Text>
      </Animatable.View>

      <TouchableOpacity onPress={getPushPermission}>
        <Text style={{ color: "#ffff" }}>Permitir notificações</Text>
      </TouchableOpacity>
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
