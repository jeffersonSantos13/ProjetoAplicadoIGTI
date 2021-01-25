import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { 
  Container,
  ButtonText,
  ProfileNavigation,
  ProfileUserContainer,
  ProfileUserInformation
} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  iconProfile: string;
  user: string | number;
  changeColor: string;
};

const ProfileItem: React.FC<ButtonProps> = ({ children, iconProfile, user, changeColor = '', ...rest }) => (
  <Container {...rest}>
    {!!iconProfile ?
      <Icon name={iconProfile} color="#44C52F" size={26} />
      :
      undefined
    }
    <ButtonText
      iconProfile={iconProfile}
      changeColor={changeColor}
    >
      {children}
    </ButtonText>
    
    <ProfileNavigation>
      <Icon
        name="chevron-forward"
        color="#44C52F"
        size={26}
      />

      <ProfileUserContainer>
        <ProfileUserInformation>{user}</ProfileUserInformation>
      </ProfileUserContainer>
    </ProfileNavigation>
    
  </Container>
);

export default ProfileItem;

