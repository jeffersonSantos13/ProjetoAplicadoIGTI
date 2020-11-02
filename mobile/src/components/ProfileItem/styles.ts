import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  iconProfile: string;
}

export const Container = styled(RectButton)`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-family: 'RobotoSlab-Regular';
  color: #616161;
  font-size: 16px;

  ${props => 
    !!props.iconProfile &&
    css`
      margin-left: 20px;
    `}
`;

export const ProfileNavigation = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row-reverse;
`;

export const ProfileUserContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const ProfileUserInformation = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #616161;
  font-size: 16px;
`;