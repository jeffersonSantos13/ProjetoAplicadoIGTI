import React, { useState } from 'react';
import { 
  Text, 
  ScrollView,
  Image,
  View
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationRoute
} from 'react-navigation';

import { useAuth } from '../../hooks/auth';

import ButtonLogOut from '../../components/ButtonLogOut';
import ProfileItem from '../../components/ProfileItem';

import { 
  Container,
  CalendarTitle,
  CalendarTitleDate,
  RecipeTitle,
  RecipeDetails,
  PrepareTitle,
  PrepareDetails,
  NutritionistTitle,
  NutritionistDetail
} from './styles';

import {
  ProfileTitle,
  ProfileTitleText,
  ProfileContainer,
  ProfileConfigurationTitle,
} from '../../styles/global';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: NavigationRoute;
}

const CalendarDetail: React.FC<Props> = ({ navigation, route }) => {
  const { date, hour, data } = route.params;
  const { description, nutritionist, recipe, prepare_mode, photo } = data;

  const convertHour = hour.substring(0, 8);
  const recipes = recipe ? recipe.split(',') : [];

  return (
    <Container>
      <View>
        <CalendarTitle>{description}</CalendarTitle>
        <CalendarTitleDate>Data: {date}</CalendarTitleDate>
        <CalendarTitleDate>Hora: {convertHour}</CalendarTitleDate>
    
        {photo && 
          <Image 
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 1
            }}
            source={{ uri: photo}}
          />
        }

        {recipes.length > 0 &&
          <View>
            <RecipeTitle>Receita</RecipeTitle>
            { recipes.map(item =>(<RecipeDetails key={item}>{item}</RecipeDetails>)) }
          </View>
        }
        
        {prepare_mode &&
          <View>
            <PrepareTitle>Modo de preparo</PrepareTitle>
            <PrepareDetails>{prepare_mode}</PrepareDetails>
          </View>
        }
        
        <NutritionistTitle>Nutricionista</NutritionistTitle>
        <NutritionistDetail>Nome: {nutritionist.name}</NutritionistDetail>
        <NutritionistDetail>E-mail: {nutritionist.email}</NutritionistDetail>
        <NutritionistDetail>CRN: {nutritionist.CRN}</NutritionistDetail>        
      </View>
    </Container>
  );
};

export default CalendarDetail;