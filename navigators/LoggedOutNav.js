import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        presentation: "card",
        headerBackTitleVisible: false,
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ title: "welcome bb" }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
