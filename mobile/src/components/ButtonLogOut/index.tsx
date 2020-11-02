import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
};

const ButtonLogOut: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <Icon name="log-out-outline" color="#44C52F" size={26} />
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default ButtonLogOut;

