import React, {
  useState,
  useEffect,
  useCallback,
  useRef, 
  useImperativeHandle, 
  forwardRef,
} from 'react';
import { TextInputProps, Text } from 'react-native';
import { useField } from '@unform/core';

import Iconicons from 'react-native-vector-icons/Ionicons';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {!!icon ?
        <Icon 
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#80F26D' : '#666360'} 
        />
        :
        undefined
      }
      
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}

        secureTextEntry = { 
        fieldName.includes("password") || fieldName.includes("newPassword") ? 
          !isVisible 
        : 
          undefined
        }
        {...rest} 
      />

      {fieldName && fieldName.includes("password") || fieldName.includes("newPassword")  ?
        <Iconicons
          name={!isVisible ? "eye-sharp" : "eye-off-sharp"}
          size={26}
          color="#80F26D"
          onPress={() => setIsVisible(!isVisible)}
        />
        :
        undefined
      }
    </Container>
  );
};

export default forwardRef(Input);

