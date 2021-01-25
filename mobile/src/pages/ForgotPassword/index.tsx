import React, { useRef, useCallback } from 'react';

import { 
  Image, 
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);

  const handleForgoPassword = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users/password/forgot', data);

        Alert.alert(
          'E-mail de recuperação de senha enviado com sucesso!',
          'Verifique sua caixa de entrada com as informações de recuperação da senha',
        );

        navigation.navigate('VerifyCodePassword');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao recuperar a senha',
          'E-mail informado não encontrado, vefique e tente novamente.',
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
              <Title>Esqueceu sua senha?</Title>
              <SubTitle>
                Digite seu E-mail e nós lhe enviaremos instruções
                sobre como criar uma nova senha
              </SubTitle>
            </View>

            <Form ref={formRef} onSubmit={handleForgoPassword}>
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Recuperar
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

export default ForgotPassword;