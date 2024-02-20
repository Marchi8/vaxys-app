import * as React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { Platform } from "react-native";

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

        if (trackStatus === "granted") {
          console.log("Yay! Tenho permissão do usuário para rastrear dados");
          return;
        }
      }
    } catch (e) {
      return e;
    }
  };

  React.useEffect(() => {
    getTrackPermission();
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
