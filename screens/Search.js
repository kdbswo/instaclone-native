import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import DismissKeyboard from "../components/DismissKeyboard";

const Input = styled.TextInput``;

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const SearchingContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const SearchingText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 15px;
`;

export default function Search({ navigation }) {
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(
    SEARCH_PHOTOS,
    {
      variables: { keyword: watch("keyword") },
    }
  );
  const onValid = () => {};
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <SearchingContainer>
            <ActivityIndicator size="large" />
            <SearchingText>Searching...</SearchingText>
          </SearchingContainer>
        ) : null}
        {!called ? (
          <SearchingContainer>
            <SearchingText>Search by keyword</SearchingText>
          </SearchingContainer>
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
