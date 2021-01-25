import React, { useRef, useCallback } from 'react';

import { 
  Image, 
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { 
  Container,
  Title,
  SubTitle,
  BackToSignIn,
  BackToSignInText,
} from './styles';

interface VerifyCodeFormData {
  code: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const NewPassword: React.FC<Props> = ({ navigation, route }) => {
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleVerifyCode = useCallback(
    async (data: VerifyCodeFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatório'),
          confirmPassword: Yup.string()
            .required('Confirmação de senha obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const param = { 
          ...data,
          user: route.params?.user
        };

        const { user } = route.params;
        
        await api.put(`/users/password/forgot/${user.id}`, param);

        navigation.navigate("SignIn");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao alterar a senha',
          'Ocorreu um problema ao alterar a senha, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView 
        style={{ flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Nova Senha</Title>
              <SubTitle>
                Insira a nova senha
              </SubTitle>
            </View>

            <Form ref={formRef} onSubmit={handleVerifyCode}>
              <Input
                ref={passwordInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="next"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Input
                ref={confirmPasswordInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="confirmPassword"
                icon="lock"
                placeholder="Confirme a senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => {navigation.goBack()}}>
        <Icon name="arrow-left" size={20} color="#176E29" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default NewPassword;