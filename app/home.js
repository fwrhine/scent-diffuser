import { useEffect, useState } from "react";
import { Button, Stack, Tabs, Text } from "tamagui";
import Settings from "./settings";

export default function Home() {
  const [activeScent, setActiveScent] = useState();
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedCompartment, setSelectedCompartment] = useState();

  const [compartment1, setCompartment1] = useState({
    color: "#F0C4FF",
    name: "Lavender",
    compartment: 1,
  });

  const [compartment2, setCompartment2] = useState({
    color: "#FAE98B",
    name: "Cinnamon",
    compartment: 2,
  });

  const [compartment3, setCompartment3] = useState({
    color: "#A3D6ED",
    name: "Eucalyptus",
    compartment: 3,
  });

  const [compartment4, setCompartment4] = useState({
    color: "#A2E4B8",
    name: "Peppermint",
    compartment: 4,
  });

  useEffect(() => {
    console.log(compartment1);
  }, [compartment1]);

  const ScentButton = ({ compartment, setCompartment }) => {
    return (
      <Button
        circular="true"
        size="$13"
        backgroundColor={compartment?.color}
        borderWidth="3px"
        borderColor="rgba(0, 0, 0, 0.1)"
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
      ></Button>
    );
  };

  return (
    <Stack>
      <Tabs defaultValue="home" value={currentTab} width="100%">
        <Tabs.Content value="home">
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
          <Stack alignItems="center" transform={"translate(0, 70px)"}>
            <Text style={{ fontFamily: "Jost_400Regular", fontSize: 24 }}>
              {activeScent?.name}
            </Text>
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
            }}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Tabs.Content>
      </Tabs>
    </Stack>
  );
}
