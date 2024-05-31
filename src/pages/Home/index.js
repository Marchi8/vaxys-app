import * as React from "react";
import { StyleSheet, View, BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

export default function Home({ navigation }) {
  const handleBackPress = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    }
    return false;
  };

  const getTrackPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        let { status: trackStatus } = await requestTrackingPermissionsAsync();
        console.log(trackStatus);
        if (trackStatus !== "granted") {
          // let = await requestTrackingPermissionsAsync();
          console.log("Não tenho permissão do usuário para rastrear dados");

          await requestTrackingPermissionsAsync();
        }
        if (trackStatus === "granted") {
          console.log("Yay! Tenho permissão do usuário para rastrear dados");

          // return navigation.navigate("Home");
        }
      }
    } catch (e) {
      return e;
    }
  };

  React.useEffect(() => {
    const trackPermissionTimeOut = setTimeout(async () => {
      await getTrackPermission();
    }, 2000);

    return () => clearTimeout(trackPermissionTimeOut);
  }, []);

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
          // allowsCameraAccess={true}
          startInLoadingState={true}
          // originWhitelist={["https://*", "http://*", "*"]}
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
