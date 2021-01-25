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

interface VerifyCodeFormData {
  code: string;
}

const VerifyCodePassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const codeInputRef = useRef<TextInput>(null);

  const handleVerifyCode = useCallback(
    async (data: VerifyCodeFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          code: Yup.string()
            .required('Código de verificação obrigatório')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/users/password/forgot/code', data);

        navigation.navigate("NewPassword", { user: response.data });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao verificar o código',
          'Código informado inválido, vefique e tente novamente.',
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
              <Title>Verificação</Title>
              <SubTitle>
                Entre com o código de 6 dígitos enviado no seu e-mail para continuar
              </SubTitle>
            </View>

            <Form ref={formRef} onSubmit={handleVerifyCode}>
              <Input
                ref={codeInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                maxLength={6}
                name="code"
                icon=""
                placeholder="Código de verificação"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Continuar
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

export default VerifyCodePassword;