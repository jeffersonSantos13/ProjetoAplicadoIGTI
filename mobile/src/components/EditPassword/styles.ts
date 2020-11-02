import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const InputTitle = styled.Text`
  color: #666360;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 10px;
  font-weight: 700;
`;

export const SaveButtom = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 100%;
`;

export const SaveChangeProfileIcon = styled(RectButton)`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 100;
  background-color: #44C52F;
`;