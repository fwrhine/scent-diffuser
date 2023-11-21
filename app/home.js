import { Link } from "expo-router";
import { Button, Stack } from "tamagui";

export default function Home() {
  return (
    <Stack flexDirection="row" space="$3">
      <Stack space="$3">
        <ScentButton color="#F0C4FF" />
        <ScentButton color="#FCD8FF" />
      </Stack>
      <Stack space="$3">
        <ScentButton color="#A3D6ED" />
        <ScentButton color="#A2E4B8" />
      </Stack>
    </Stack>
  );
}

const ScentButton = ({ color }) => {
  return (
    <Button
      circular="true"
      size="$13"
      backgroundColor={color}
      borderWidth="3px"
      borderColor="rgba(0, 0, 0, 0.1)"
    ></Button>
  );
};
