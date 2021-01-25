import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const Card = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const CardDetail = styled.View`
  margin-left: 10px;
  width: 100%;
  border-bottom-color: #44C52F;
  border-bottom-width: 1px;
`;

export const CardName = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #44C52F;
`;

export const CardEmail = styled.Text`
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const CardPhone = styled.Text`
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const ImageProfile = styled.View`
  height: 80px;
  width: 80px;
`;