import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Text, 
  ScrollView,
  Alert,
  TextInput
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
  email: string;
  newPassword: string;
}

const EditPassword: React.FC<Props> = ({ navigation }) => {
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);

  const { handleChangeUserPassword } = useAuth();

  const handleSignIn = useCallback(
    async (data: ProfileData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          newPassword: Yup.string().required('Nova Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await handleChangeUserPassword({ data });

        Alert.alert(
          'Senha alterada com sucesso!',
          'A senha foi alterada com sucesso.'
        )
        
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          
          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro ao atualizar a senha',
            errors[Object.keys(errors)[0]]
          )

          return;
        }

        Alert.alert(
          'Erro ao atualizar a senha', 
          'Ocorreu um erro ao realizar a atualização da senha, cheque as infrmações.',
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
            <Text>Senha atual</Text>
          </InputTitle>
          <Input
            autoCorrect={false}
            ref={passwordInputRef}
            name="password"
            icon="lock"
            placeholder="Senha atual"
            returnKeyType="next"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <InputTitle>
            <Text>Nova senha</Text>
          </InputTitle>
          <Input
            autoCorrect={false}
            ref={newPasswordInputRef}
            name="newPassword"
            icon="lock"
            placeholder="Nova Senha"
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

export default EditPassword;