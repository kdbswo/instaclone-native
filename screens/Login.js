import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={"rgba(255,255,255,0.6)"}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255,255,255,0.6)"}
      />
    </AuthLayout>
  );
}
