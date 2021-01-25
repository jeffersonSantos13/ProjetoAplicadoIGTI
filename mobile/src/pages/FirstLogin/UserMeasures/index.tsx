import React, { useRef } from 'react';
import { TextInput, Alert }  from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationRoute
} from 'react-navigation';

import { Form } from  '@unform/mobile';
import { FormHandles } from '@unform/core';

import InputMaterial from '../../../components/InputMaterial';
import Button from '../../../components/Button';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useAuth } from '../../../hooks/auth';

import * as Yup from 'yup';

import {
  FirstLoginContainer,
  FirstLoginTitle,
  FirstLoginSubTitle
} from '../../../styles/global';

import { 
} from './styles';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: NavigationRoute;
}

interface FormData {
  weight: number;
  height: number;
}

const UserMeasures: React.FC<Props> = ( { navigation, route } ) => {
  const formRef = useRef<FormHandles>(null);
  const weightInputRef = useRef<TextInput>(null);
  const heigthInputRef = useRef<TextInput>(null);

  const { handleUpdateUser, handleFirstLogin } = useAuth();

  const handleSubmit = async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        weight: Yup.string()
          .required('Peso obrigatório'),
        height: Yup.string()
          .required('Altura obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { gender, desire_weight } = route.params;
      const { weight, height } = data;

      const params = {
        gender,
        desire_weight,
        weight,
        height,
      };

      await handleUpdateUser({ data: params, field: null});

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Peso ou Altura não informado', 
        'Ocorreu um erro ao enviar as informações, tente novamente.',
      );
    }
  }

  return (
    <FirstLoginContainer>
      <FirstLoginTitle>Medições Corporais</FirstLoginTitle>
      <FirstLoginSubTitle>E Quanto a Sua Altura e Peso Atuais?</FirstLoginSubTitle>
      
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputMaterial
          ref={heigthInputRef}
          name="height"
          icon=""
          text="Altura (cm)"
          placeholder="Altura"
          returnKeyType="next"
          onSubmitEditing={() => {
            weightInputRef.current?.focus();
          }}
        />
        <InputMaterial
          ref={weightInputRef}
          name="weight"
          icon=""
          text="Peso atual (kg)"
          placeholder="Peso"
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>

      <Button
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: 30,
        }}
        onPress={() => {
          formRef.current?.submitForm();
        }}
      >
        Continuar
      </Button>

    </FirstLoginContainer>
  );
};

export default UserMeasures;