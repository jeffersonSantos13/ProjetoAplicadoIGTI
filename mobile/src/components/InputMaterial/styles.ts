import styled, { css } from 'styled-components/native';
import FetherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-size: 18px;
  align-items: center;
  text-align: center;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FetherIcon)`
  margin-right: 16px;
`;

export const LabelInput = styled.Text`
  font-size: 16px;
  color: #666360;
  font-family: 'RobotoSlab-Regular';
`;