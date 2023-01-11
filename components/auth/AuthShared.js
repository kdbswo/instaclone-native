import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 10px 7px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
