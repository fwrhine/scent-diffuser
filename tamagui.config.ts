// the v2 config imports the css driver on web and react-native on native

// for reanimated: @tamagui/config/v2-reanimated

// for react-native only: @tamagui/config/v2-native

import { config } from "@tamagui/config/v2";

import { createFont, createTamagui } from "tamagui";
const tamaguiConfig = createTamagui({
  ...config,
  // fonts: {
  //   body: createFont({
  //     family: "Jost_400Regular, sans-serif",
  //     size: {
  //       1: 12,
  //       2: 14,
  //       3: 15,
  //     },
  //   }),
  //   heading: createFont({
  //     family: "Jost_400Regular, sans-serif",
  //     size: {
  //       1: 12,
  //       2: 14,
  //       3: 15,
  //     },
  //   }),
  // },
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web

// be sure the import and declare module lines both use that same name
