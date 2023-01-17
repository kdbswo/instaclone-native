import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

export default function Feed({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Feed</Text>
      </TouchableOpacity>
      <AuthButton text="Log Out" onPress={() => logUserOut()} />
    </View>
  );
}
