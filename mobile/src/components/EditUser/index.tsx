import React, { useRef, useEffect, useCallback } from 'react';
import { 
  Text, 
  ScrollView,
  Alert,
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
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
}

interface ProfileData {
  name: string;
  email: string;
}

const EditUser: React.FC<Props> = ({ route, navigation }) => {
  const { profile, title, placeholder, inputTitle, nameProfile } = route.params;
  
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef(null);

  const { handleUpdateUser } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: title });
    inputRef.current?.focus();
  }, []);

  const handleSignIn = useCallback(
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
        <Form ref={formRef} onSubmit={handleSignIn}>
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
        </Form>
        
        <SaveButtom>
          <SaveChangeProfileIcon>
            <Icon
              name="save-sharp"
              color="#FFF"
              size={28}
              onPress={() => {
                formRef.current?.submitForm();
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