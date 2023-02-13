import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Room from "../screens/Room";
import { Ionicons } from "@expo/vector-icons";
import Rooms from "../screens/Rooms";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
export default function MessagesNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-down" size={28} color={tintColor} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
