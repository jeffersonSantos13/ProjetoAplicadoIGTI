import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface IImageProfileProps {
  profileImage: String;
}

export const Container = styled.View`
  padding: 10px;
  flex: 1;
  background-color: #fff;
`;

export const ImageProfile = styled.View`
  height: 100px;
  background-color: #fff;  
  flex-direction: row;
  align-items: center;
`;