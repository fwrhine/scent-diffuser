import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, StyleSheet, View } from "react-native";

import { ScrollView, TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import Home from "./app/home";

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Jost_400Regular } from "@expo-google-fonts/jost";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    Jost_400Regular,
    Inter: require("./assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.container} onLayout={onLayoutRootView}>
            <Home />
            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
