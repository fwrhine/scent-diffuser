import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import Home from "./app/home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Settings from "./app/settings";

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <View style={styles.container}>
          <Settings />
          <StatusBar style="auto" />
        </View>
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
