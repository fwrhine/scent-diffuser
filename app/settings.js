import { H1, Input, Stack, Text } from "tamagui";
import { Feather } from "@expo/vector-icons";

import ColorPicker, { Panel3 } from "reanimated-color-picker";
import { useEffect, useState } from "react";

export default function Settings({
  selectedCompartment,
  onChange,
  setCurrentTab,
}) {
  const [selectedColor, setSelectedColor] = useState(
    selectedCompartment?.color || "#FFFFFF"
  );
  const [name, setName] = useState(selectedCompartment?.name);

  useEffect(() => {
    setSelectedColor(selectedCompartment?.color);
  }, [selectedCompartment]);

  const onSelectColor = ({ hex, rgb }) => {
    setSelectedColor(hex.toUpperCase());
    onChange({
      ...selectedCompartment,
      color: hex.toUpperCase(),
    });
  };

  return (
    <Stack space="$5" width={"100%"}>
      <Stack space="$6" margin={45}>
        <Stack space="$6">
          <Stack
            transform="translate(-5px, 0)"
            onPress={() => {
              setCurrentTab("home");
            }}
          >
            <Feather name="arrow-left" size={30} color="black" />
          </Stack>
          <Stack space="$2">
            <Text style={{ fontFamily: "Jost_400Regular", fontSize: 17 }}>
              Compartment 1
            </Text>
            <Stack
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <H1 style={{ fontFamily: "Jost_400Regular" }}>{name}</H1>
              <Stack>
                <Feather name="edit-3" size={24} color="black" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack alignItems="center" width={"100%"}>
          <Stack flexDirection="row" space="$5">
            <Stack borderBottomWidth="1px" paddingBottom="$2">
              <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
                Color
              </Text>
            </Stack>
            <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
              Sound
            </Text>
          </Stack>
        </Stack>
        <Stack alignItems="center">
          <ColorPicker
            style={{ width: "70%" }}
            value={selectedColor}
            onComplete={onSelectColor}
          >
            <Panel3 />
          </ColorPicker>
        </Stack>
        <Stack alignItems="center" space="$3">
          <Stack
            padding="$4"
            borderColor="black"
            borderWidth="1px"
            borderRadius={8}
            backgroundColor={selectedColor}
            width={"50%"}
          ></Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            width={"100%"}
            flexDirection="row"
            space="$5"
          >
            <Text style={{ fontFamily: "Jost_400Regular", fontSize: 17 }}>
              HEX
            </Text>
            <Input
              backgroundColor="transparent"
              size="$4"
              borderWidth={1}
              borderColor="black"
              value={selectedColor}
              onChangeText={setSelectedColor}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
