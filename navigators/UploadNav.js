import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white", top: 0 },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Select" component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
