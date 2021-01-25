import React, { useEffect, useState } from 'react';
import { 
  ScrollView,
  Image,
  Text,
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import { useAuth } from '../../hooks/auth';

import { 
  Container,
  Card,
  ImageProfile,
  CardDetail,
  CardName,
  CardEmail,
  CardPhone,
} from './styles';

import {
  ProfileTitle,
  ProfileTitleText,
  ProfileContainer,
  ProfileConfigurationTitle,
} from '../../styles/global';

import api from '../../services/api';

import noImage from '../../assets/no-image.png';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Nutritionits: React.FC<Props> = ({ navigation }) => {
  const { user, handleSendPhotoAvatar } = useAuth();
  const [ list, setList ] = useState([]);

  useEffect(() => {
    (async() => {
      const nutritionists = await api.get('/users/nutritionists');
      
      setList(nutritionists.data);
    })();
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
    >
      {list.map(item => (
        <Container key={item.id}> 
          <Card>
            <ImageProfile>
              <Image 
                style={{
                  width: 80,
                  height: 80,
                  marginLeft: 0,
                  borderRadius: 100,
                  borderWidth: 1
                }}
                source={!!item.avatar ? { uri: item.avatar} : noImage}
              />
            </ImageProfile>
            <CardDetail>
              <CardName>{item.name}</CardName>
              <CardEmail>{item.email}</CardEmail>
              <CardPhone>{item.phone == null ? '' : item.phone}</CardPhone>
            </CardDetail>
          </Card>
        </Container>
      ))}
    </ScrollView>
  );
};

export default Nutritionits;