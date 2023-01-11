import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 60%;
  width: 100%;
  height: 200px;
`;

export default function AuthLayout({ children }) {
  const dissmissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dissmissKeyboard}>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 135 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
