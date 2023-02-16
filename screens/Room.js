import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

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

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View`
  margin-right: 10px;
`;
const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 25px;
`;
const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  margin-bottom: 5px;
  margin-top: 25px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 95%;
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
`;
export default function Room({ route, navigation }) {
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      const messageObj = {
        id,
        payload: message,
        user: {
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [messageFragment, ...prev];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );
  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };
  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      title: `Conversation with ${route?.params?.talkingTo?.username}`,
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message?.user?.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
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
          style={{ width: "100%", paddingTop: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Write a message..."
          returnKeyLabel="send Message"
          returnKeyType="send"
          onChangeText={(text) => setValue("message", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
