import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface IImageProfileProps {
  profileImage: String;
}

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  background-color: #fff;
`;

export const CalendarTitle  = styled.Text`
  color: #44C52F;
  font-size: 28px;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 5px;
`;

export const CalendarTitleDate = styled.Text`
  color: #000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const RecipeTitle = styled.Text`
  margin-top: 20px;
  font-size: 24px;
  color: #44C52F;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 5px;
`;

export const RecipeDetails = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: 'RobotoSlab-Regular';
`;

export const PrepareTitle = styled.Text`
  margin-top: 20px;
  font-size: 24px;
  color: #44C52F;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 5px;
`;

export const PrepareDetails = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: 'RobotoSlab-Regular';
`;


export const NutritionistTitle = styled.Text`
  margin-top: 20px;
  font-size: 24px;
  color: #44C52F;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 5px;
`;

export const NutritionistDetail = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: 'RobotoSlab-Regular';
`;