import * as React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

Notifications.requestPermissionsAsync().then((status) => {
  return;
});

export default function Home({ navigation }) {
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

  // React.useEffect(() => {
  //   handleCallNotification().then((token) => setExpoPushToken(token));

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  const handleBackPress = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          scalesPageToFit
          javaScriptEnabled
          domStorageEnabled
          geolocationEnabled={true}
          allowsCameraAccess={true}
          startInLoadingState={true}
          originWhitelist={["https://*", "http://*", "*"]}
          source={{ uri: "https://www.vaxys.com.br" }}
          style={styles.webview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#077067",
  },
  webview: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
});
