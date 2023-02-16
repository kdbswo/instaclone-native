import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View``;
const Author = styled.View``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;
const TextInput = styled.TextInput`
  margin-bottom: 5px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 95%;
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
`;
export default function Room({ route, navigation }) {
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `Conversation with ${route?.params?.talkingTo?.username}`,
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message?.user?.avatar }} />
        <Username>{message.user.username}</Username>
        <Message>{message.payload}</Message>
      </Author>
    </MessageContainer>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Write a message..."
          returnKeyLabel="send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
