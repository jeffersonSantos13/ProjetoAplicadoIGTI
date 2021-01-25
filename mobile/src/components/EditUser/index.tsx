import React, { useRef, useEffect, useCallback, useState } from 'react';
import { 
  Text, 
  ScrollView,
  Alert,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationRoute
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import * as Yup from 'yup';

import { Form } from  '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../Input';

import { 
  Container,
  InputTitle,
  SaveButtom,
  SaveChangeProfileIcon
} from './styles';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: NavigationRoute;
}

interface ProfileData {
  name: string;
  email: string;
  value: string;
}

const EditUser: React.FC<Props> = ({ route, navigation }) => {
  const { profile, title, placeholder, inputTitle, nameProfile, combo, option } = route.params;
  const [ item, setItem ] = useState('');
  
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef(null);

  const { handleUpdateUser } = useAuth();

  let items = {};

  switch(option) {
    case 'gender': {
      items = [
        {label: 'Masculino', value: 'male', icon: () => <Icon name="male" size={18} color="#000" />, hidden: true},
        {label: 'Feminino', value: 'female', icon: () => <Icon name="female" size={18} color="#000" />},
      ];
      break;
    } case 'uf': {
      items = [
        {label: 'Acre', value: 'AC', hidden: true},
        {label: 'Alagoas', value: 'AL'},
        {label: 'Amapá', value: 'AP'},
        {label: 'Amazonas', value: 'AM'},
        {label: 'Bahia', value: 'BA'},
        {label: 'Ceará', value: 'CE'},
        {label: 'Espírito Santo', value: 'ES'},
        {label: 'Goiás', value: 'GO'},
        {label: 'Maranhão', value: 'MA'},
        {label: 'Mato Grosso', value: 'MT'},
        {label: 'Mato Grosso do Sul', value: 'MS'},
        {label: 'Minas Gerais', value: 'MG'},
        {label: 'Pará', value: 'PA'},
        {label: 'Paraíba', value: 'PB'},
        {label: 'Paraná', value: 'PR'},
        {label: 'Pernambuco', value: 'PE'},
        {label: 'Piauí', value: 'PI'},
        {label: 'Rio de Janeiro', value: 'RJ'},
        {label: 'Rio Grande do Norte', value: 'RN'},
        {label: 'Rio Grande do Sul', value: 'RS'},
        {label: 'Rondônia', value: 'RO'},
        {label: 'Roraima', value: 'RR'},
        {label: 'Santa Catarina', value: 'SC'},
        {label: 'São Paulo', value: 'SP'},
        {label: 'Sergipe', value: 'SE'},
        {label: 'Tocantins', value: 'TO'},
        {label: 'Distrito Federal', value: 'DF'},
      ];
    
      break;
    }
  }

  useEffect(() => {
    navigation.setOptions({ title: title });
    inputRef.current?.focus();
  }, []);

  const handleUpdateCombo = async() => {
    try {
      let data = {};
      data[option] = item;

      await handleUpdateUser({ data, field: nameProfile });
      
      navigation.goBack();
    } catch (err) {

      Alert.alert(
        'Erro ao atualizar cadastro', 
        'Ocorreu um erro ao realizar a atualização do cadastro, cheque as infrmações.',
      );
    }
  }

  const handleUpdate = useCallback(
    async (data: ProfileData) => {
      try {
        formRef.current?.setErrors({});

        let schema = undefined;

        if (nameProfile && nameProfile === "email") {
          schema = Yup.object().shape({
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
          });
          
          await schema.validate(data, {
            abortEarly: false,
          });
        }

        await handleUpdateUser({ data, field: nameProfile });
        
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          
          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro ao atualizar cadastro',
            errors[Object.keys(errors)[0]]
          )

          return;
        }

        Alert.alert(
          'Erro ao atualizar cadastro', 
          'Ocorreu um erro ao realizar a atualização do cadastro, cheque as infrmações.',
        );
      }
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
      <Form ref={formRef} onSubmit={handleUpdate}>

        {!combo &&
          <>
          <InputTitle>
            <Text>{inputTitle}</Text>
          </InputTitle>
          <Input
            autoCorrect={false}
            ref={inputRef}
            name={nameProfile}
            defaultValue={profile}
            icon=""
            placeholder={placeholder}
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          </>
        }
        
        {combo &&
          <>
           <InputTitle>
            <Text>{inputTitle}</Text>
          </InputTitle>
          <DropDownPicker
            items={items}
            labelStyle={{
              color: '#000',
              fontFamily: 'RobotoSlab-Regular'
            }}
            defaultValue={profile}
            containerStyle={{height: 60}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setItem(item.value)}
          />
          </>
        }

        </Form>
        
        <SaveButtom>
          <SaveChangeProfileIcon>
            <Icon
              name="save-sharp"
              color="#FFF"
              size={28}
              onPress={() => {
                if (combo) {
                  handleUpdateCombo()
                } else {
                  formRef.current?.submitForm();
                }
              }}
            >
            </Icon>
          </SaveChangeProfileIcon>
        </SaveButtom>
      </Container>
    </ScrollView>
  );
};

export default EditUser;