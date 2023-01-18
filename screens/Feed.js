import { gql, useQuery } from "@apollo/client";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Feed</Text>
      {/* <AuthButton text="Log Out" onPress={() => logUserOut()} /> */}
    </View>
  );
}
