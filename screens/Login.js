import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text>Go to Crate Account</Text>
      </TouchableOpacity>
    </View>
  );
}
