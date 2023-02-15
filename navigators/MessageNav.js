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
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-down" size={30} color={tintColor} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
