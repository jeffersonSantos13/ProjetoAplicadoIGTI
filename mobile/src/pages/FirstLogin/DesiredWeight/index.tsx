import React, { useRef } from 'react';

import {
  TextInput,
  Alert,
} from 'react-native';

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
  desire_weight: number;
}

const DesiredWeight: React.FC<Props> = ( { navigation, route } ) => {
  const formRef = useRef<FormHandles>(null);
  const weightInputRef = useRef<TextInput>(null);

  const handleSubmit = async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        desire_weight: Yup.string()
          .required('Peso obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { gender } = route.params;
      const { desire_weight } = data;

      const params = {
        gender,
        desire_weight,
      };

      navigation.navigate("UserMeasures", params);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Peso não informado', 
        'Ocorreu um erro ao enviar o peso, tente novamente.',
      );
    }
  }

  return (
    <FirstLoginContainer>
      <FirstLoginTitle>Peso Desejado</FirstLoginTitle>
      <FirstLoginSubTitle>Qual é o Peso Ideal Você quer Alcançar?</FirstLoginSubTitle>
      
      <Form ref={formRef} onSubmit={handleSubmit}>
       <InputMaterial
          ref={weightInputRef}
          name="desire_weight"
          icon=""
          text="KG"
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

export default DesiredWeight;