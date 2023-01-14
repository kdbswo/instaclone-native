import { Text, View } from "react-native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

export default function Feed() {
  return (
    <View>
      <AuthButton text="Log Out" onPress={() => logUserOut()} />
    </View>
  );
}
