import { H1, H5, H6, Stack, Text } from "tamagui";
import { Feather } from "@expo/vector-icons";

export default function Settings() {
  return (
    <Stack space="$5" width={"100%"}>
      <Stack space="$10" margin={30}>
        <Stack space="$2">
          <H5>Compartment 1</H5>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
          >
            <H1>Lavender</H1>
            <Stack paddingTop="$3">
              <Feather name="edit-3" size={24} color="black" />
            </Stack>
          </Stack>
        </Stack>
        <Stack alignItems="center" width={"100%"}>
          <Stack flexDirection="row" space="$5">
            <Stack borderBottomWidth="1px" paddingBottom="$2">
              <H6>Color</H6>
            </Stack>
            <H6>Sound</H6>
          </Stack>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          width={"100%"}
          flexDirection="row"
          space="$5"
        >
          <H5>HEX</H5>
          <Stack
            padding="$2"
            borderColor="black"
            borderWidth="1px"
            borderRadius={8}
          >
            <H5>#</H5>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
