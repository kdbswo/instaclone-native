import { gql, useQuery } from "@apollo/client";
import { FlatList, Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import RoomItem from "../components/rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragments";
import useMe from "../hooks/useMe";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }) => <RoomItem {...room} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={{
          width: "100%",
          height: 2,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
