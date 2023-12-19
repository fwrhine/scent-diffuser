import {
  H1,
  Image,
  Input,
  Stack,
  Text,
  XStack,
} from "tamagui";
import { Feather } from "@expo/vector-icons";

import ColorPicker, { Panel3 } from "reanimated-color-picker";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Settings({
  selectedCompartment,
  onChange,
  setCurrentTab,
}) {
  const [currentSettings, setCurrentSettings] = useState("color");
  const [name, setName] = useState(selectedCompartment?.name);

  // Handle color and sound change
  const [selectedColor, setSelectedColor] = useState(
    selectedCompartment?.color || "#FFFFFF"
  );
  const [selectedSound, setSelectedSound] = useState(
    selectedCompartment?.sound || "Sparkle"
  );

  useEffect(() => {
    setSelectedColor(selectedCompartment?.color);
    setSelectedSound(selectedCompartment?.sound);
  }, [selectedCompartment]);

  const onSelectColor = ({ hex, rgb }) => {
    setSelectedColor(hex.toUpperCase());
    onChange({
      ...selectedCompartment,
      color: hex.toUpperCase(),
    });
  };

  useEffect(() => {
    onChange({
      ...selectedCompartment,
      sound: selectedSound,
    });
  }, [selectedSound]);

  // Handle time picker
  const [date, setDate] = useState(new Date());
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  return (
    <Stack space="$5" width={"100%"} height={"100%"} paddingVertical={"$12"}>
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
            <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
              Compartment {selectedCompartment?.compartment}
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
          <Stack flexDirection="row" space="$7">
            <Stack
              borderBottomWidth={currentSettings === "color" && "2px"}
              paddingBottom="$2"
              onPress={() => {
                setCurrentSettings("color");
              }}
            >
              <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
                Color
              </Text>
            </Stack>
            <Stack
              borderBottomWidth={currentSettings === "sound" && "2px"}
              paddingBottom="$2"
              onPress={() => {
                setCurrentSettings("sound");
              }}
            >
              <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
                Sound
              </Text>
            </Stack>
            <Stack
              borderBottomWidth={currentSettings === "schedule" && "2px"}
              paddingBottom="$2"
              onPress={() => {
                setCurrentSettings("schedule");
              }}
            >
              <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
                Schedule
              </Text>
            </Stack>
          </Stack>
        </Stack>
        {currentSettings === "color" && (
          <>
            <Stack space="$6" height="300px">
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
                  borderWidth="2px"
                  borderRadius={8}
                  backgroundColor={selectedColor}
                  width={"50%"}
                ></Stack>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  width={"100%"}
                  flexDirection="row"
                  space="$3"
                >
                  <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
                    HEX
                  </Text>
                  <Input
                    backgroundColor="transparent"
                    size="$4"
                    borderWidth={2}
                    borderColor="black"
                    value={selectedColor}
                    onChangeText={setSelectedColor}
                    fontSize={20}
                  />
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
        {currentSettings === "sound" && (
          <>
            <Stack space="$6" marginHorizontal="$7">
              <Sound
                name="Sparkle"
                icon={require("../assets/icons/clean.png")}
                selectedSound={selectedSound}
                setSelectedSound={setSelectedSound}
              />
              <Sound
                name="Wave"
                icon={require("../assets/icons/waves.png")}
                selectedSound={selectedSound}
                setSelectedSound={setSelectedSound}
              />
              <Sound
                name="Breeze"
                icon={require("../assets/icons/wind.png")}
                selectedSound={selectedSound}
                setSelectedSound={setSelectedSound}
              />
              <Sound
                name="Wind Chime"
                icon={require("../assets/icons/wind-chime.png")}
                selectedSound={selectedSound}
                setSelectedSound={setSelectedSound}
              />
              <Sound
                name="No Sound"
                icon={require("../assets/icons/mute.png")}
                selectedSound={selectedSound}
                setSelectedSound={setSelectedSound}
              />
            </Stack>
          </>
        )}
        {currentSettings === "schedule" && (
          <>
            <Stack marginHorizontal="$7" space="$5">
              <XStack space="$5">
                <Stack space="$5" alignItems="end" justifyContent="end">
                  <Stack height={40}>
                    <Text
                      style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}
                      width="100%"
                      textAlign="right"
                    >
                      TIME
                    </Text>
                  </Stack>
                  <Text
                    style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}
                    width="100%"
                    textAlign="right"
                  >
                    DAY
                  </Text>
                </Stack>
                <Stack space="$5" alignItems="start">
                  <Stack height={40}>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={"time"}
                      is24Hour={true}
                      onChange={onDateChange}
                    />
                  </Stack>
                  <Stack space="$2" marginLeft={"$2"}>
                    {Object.keys(days).map((n, i) => {
                      return (
                        <Stack
                          padding="$2"
                          borderColor="black"
                          borderWidth="2px"
                          borderRadius={8}
                          backgroundColor={
                            days[n] ? selectedColor : "transparent"
                          }
                          onPress={() => {
                            console.log(days);
                            setDays({
                              ...days,
                              [n]: !days[n],
                            });
                          }}
                          alignItems="center"
                        >
                          <Text
                            style={{
                              fontFamily: "Jost_400Regular",
                              fontSize: 20,
                            }}
                          >
                            {n}
                          </Text>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </XStack>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}

const Sound = ({ name, icon, selectedSound, setSelectedSound }) => {
  return (
    <Stack
      flexDirection="row"
      onPress={() => {
        setSelectedSound(name);
      }}
      space={"$5"}
    >
      <Image
        source={{
          width: 35,
          height: 35,
          uri: icon,
        }}
        width={30}
        height={30}
      />
      <Stack
        flexGrow={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={"1px"}
        paddingBottom="$4"
      >
        <Text style={{ fontFamily: "Jost_400Regular", fontSize: 20 }}>
          {name}
        </Text>
        {selectedSound === name && (
          <Feather name="check" size={24} color="black" />
        )}
      </Stack>
    </Stack>
  );
};
