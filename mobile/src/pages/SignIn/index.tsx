import React, { useCallback, useRef, useEffect }  from 'react';
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
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { GoogleSignin } from '@react-native-community/google-signin';

import { Form } from  '@unform/mobile';
import { FormHandles } from '@unform/core';

import { GoogleSocialButton } from "react-native-social-buttons";

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { 
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInformData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { signIn, user, googleSignIn } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '873434789431-6feft9dh60425ev3t8ip2nc7phqaed6e.apps.googleusercontent.com'
    });
  }, [])
  
  const handleSignIn = useCallback(
    async (data: SignInformData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação', 
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
  }, [signIn]);

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
            <Image 
              source={logoImg} 
              style={{
                height: 250,
                width: 250,
                marginBottom: -60,
                marginTop: 40
              }}
            />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>

            <ForgotPassword onPress={() => {navigation.navigate('ForgotPassword')}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
            
            {Platform.OS === 'android' ? (
              <GoogleSocialButton 
                onPress={googleSignIn}
              />
            )
            : null }
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => {navigation.navigate('SignUp')}}>
        <Icon name="log-in" size={20} color="#176E29" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;