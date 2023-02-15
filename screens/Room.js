import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Text, View } from "react-native";

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

export default function Room({ route, navigation }) {
  const { data } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `Conversation with ${route?.params?.talkingTo?.username}`,
    });
  }, []);
  console.log(JSON.stringify(data));
  return (
    <View>
      <Text>Messages List</Text>
    </View>
  );
}
