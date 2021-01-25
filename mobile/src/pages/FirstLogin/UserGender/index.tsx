import React from 'react';
import { Image, TouchableOpacity }  from 'react-native';
import { useNavigation } from '@react-navigation/native';

import male from '../../../assets/male-simbol.png';
import famele from '../../../assets/female-simbol.png';

import {
  FirstLoginContainer,
  FirstLoginTitle,
  FirstLoginSubTitle
} from '../../../styles/global';

import { 
  Gender
} from './styles';

const UserGender: React.FC = () => {
  const navigation = useNavigation();

  const handleGender = (gender) => {
    navigation.navigate("DesiredWeight", gender);
  };

  return (
    <FirstLoginContainer>
      <FirstLoginTitle>Vamos Criar Seu Perfil Corporal</FirstLoginTitle>
      <FirstLoginSubTitle>Selecione Seu Gênero</FirstLoginSubTitle>
      
      <Gender>
        <TouchableOpacity
          onPress={() => handleGender({ gender: "male" })}
        >
          <Image
            style={{
              width: 80,
              height: 80,
              marginRight: 30
            }}
            source={male} 
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleGender({ gender: "female" })}
        >
          <Image
            source={famele} 
          />
        </TouchableOpacity>
      </Gender>
    </FirstLoginContainer>
  );
};

export default UserGender;