import { useState } from "react";
import { Button, Stack, Tabs, Text } from "tamagui";
import Settings from "./settings";

export default function Home() {
  const [activeScent, setActiveScent] = useState();
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedCompartment, setSelectedCompartment] = useState();

  const [compartment1, setCompartment1] = useState({
    color: "#F0C4FF",
    name: "Lavender",
    sound: "Sparkle",
    compartment: 1,
  });

  const [compartment2, setCompartment2] = useState({
    color: "#FAE98B",
    name: "Cinnamon",
    sound: "Wave",
    compartment: 2,
  });

  const [compartment3, setCompartment3] = useState({
    color: "#A3D6ED",
    name: "Eucalyptus",
    sound: "Breeze",
    compartment: 3,
  });

  const [compartment4, setCompartment4] = useState({
    color: "#A2E4B8",
    name: "Peppermint",
    sound: "Wind Chime",
    compartment: 4,
  });

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const ScentButton = ({ compartment, setCompartment }) => {
    return (
      <Button
        size="$13"
        circular="true"
        backgroundColor={compartment?.color}
        borderColor="rgba(0, 0, 0, 0.6)"
        borderWidth="3px"
        onPress={() => {
          if (activeScent && activeScent?.name === compartment?.name) {
            setActiveScent();
          } else {
            setActiveScent(compartment);
          }
        }}
        onLongPress={() => {
          setSelectedCompartment(compartment);
          setCurrentTab("settings");
        }}
        animation="bouncy"
        pressStyle={{
          scale: 0.8,
          backgroundColor: compartment?.color,
          borderColor: "rgba(0, 0, 0, 0.6)",
          borderWidth: "3px",
        }}
      ></Button>
    );
  };

  return (
    <Stack
      backgroundColor={(currentTab === "home" && activeScent?.color) || "white"}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      animation="slow"
    >
      <Tabs defaultValue="home" value={currentTab} width="100%">
        <Tabs.Content value="home" width={"100%"} alignItems="center">
          <Stack space="$7" paddingTop="$10">
            <Stack space="$3">
              <Stack space="$3" flexDirection="row">
                <ScentButton
                  compartment={compartment1}
                  setCompartment={setCompartment1}
                />
                <ScentButton
                  compartment={compartment2}
                  setCompartment={setCompartment2}
                />
              </Stack>
              <Stack space="$3" flexDirection="row">
                <ScentButton
                  compartment={compartment3}
                  setCompartment={setCompartment3}
                />
                <ScentButton
                  compartment={compartment4}
                  setCompartment={setCompartment4}
                />
              </Stack>
            </Stack>
            <Stack alignItems="center" opacity={activeScent?.name ? 1 : 0}>
              <Text style={{ fontFamily: "Jost_400Regular", fontSize: 24 }}>
                {activeScent?.name || "Inactive"}
              </Text>
            </Stack>
          </Stack>
        </Tabs.Content>
        <Tabs.Content value="settings" width={"100%"}>
          <Settings
            selectedCompartment={selectedCompartment}
            onChange={(e) => {
              if (selectedCompartment.compartment === 1) {
                setCompartment1(e);
              } else if (selectedCompartment.compartment === 2) {
                setCompartment2(e);
              } else if (selectedCompartment.compartment === 3) {
                setCompartment3(e);
              } else {
                setCompartment4(e);
              }

              console.log(hexToRgb(e.color));
            }}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Tabs.Content>
      </Tabs>
    </Stack>
  );
}
