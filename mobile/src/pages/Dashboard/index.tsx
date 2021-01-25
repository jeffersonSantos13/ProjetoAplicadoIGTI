import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { View, Text, ScrollView, Image, TouchableOpacity }  from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { 
  Container,
  ProfileIcon,
  DesireContainer,
  DesireTitle,
  DesireParaghaph,
  SchenduleContainer,
  SchenduleTitle,
  Card,
  CardItem,
  CardTitle,
  RecipeContainer,
  RecipeParaghaph,
  BulletRow
} from './styles';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [ schendule, setSchendule ] = useState([]);

  useEffect(() => {
    (async() => {
      const [token] = await AsyncStorage.multiGet([
        '@FitLife:token',
      ]);

      const date = new Date();
      let month = '' + ( date.getMonth() + 1 );
      month = month.length < 2 ? '0' + month : month;

      let day = '' + ( date.getDate());
      day = day.length < 2 ? '0' + day : day;

      let tomorrow = '' + ( date.getDate() + 1);
      tomorrow = tomorrow.length < 2 ? '0' + tomorrow : tomorrow;
      
      const dateInit = date.getFullYear() + '-' + month + '-' + day;
      const dateEnd = date.getFullYear() + '-' + month + '-' + tomorrow;
      
      const schendules = await api.get(`/schendules?dateInit=${dateInit}&dateEnd=${dateEnd}`, {
        headers: {
          'Authorization': `Bearer ${token[1]}`
        }
      });

      setSchendule(schendules.data);
    })();
  }, []);
 
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <ProfileIcon>
          <Icon
            onPress={() => navigation.navigate('Settings') }
            name="md-person-circle-outline" color='#44C52F' size={36}
          />
        </ProfileIcon>

        <SchenduleContainer>
          <SchenduleTitle>Objetivo do dia</SchenduleTitle>
          {schendule.map(item => (
            <>
            <TouchableOpacity
              onPress={() => {
                const data = {
                  date: item.date.split('T')[0],
                  hour: item.date.split('T')[1],
                  data: item,
                }
                navigation.navigate("CalendarDetail", data)
              }}
            >
              <Card>
                <Image 
                  style={{
                    width: 140,
                    height: 140,
                    marginLeft: -5,
                    marginRight: 10,
                    borderWidth: 1,
                    borderRadius: 90
                  }}
                  source={{ uri: item.photo }}
                />
                <CardItem>
                  <CardTitle>{item.description}</CardTitle>
                  <Text>{item.date.split('T')[0]}</Text>
                  <Text>{item.date.split('T')[1].substring(0, 8)}</Text>
                  <Text></Text>
                  {item.recipe &&
                    <View>
                      <Text>Receita</Text>
                      { item.recipe.split(',').map(i => (<Text key={i}>{i}</Text>)) }
                    </View>
                  }
                </CardItem>
              </Card>
            </TouchableOpacity>
            </>
          ))}
        </SchenduleContainer>

        <DesireContainer>
          <DesireTitle>Peso que deseja alcançar</DesireTitle>
          <DesireParaghaph>Peso ideal: {user.desire_weight} KG</DesireParaghaph>
        </DesireContainer>
        <DesireContainer>
          <DesireTitle>Peso atual</DesireTitle>
          <DesireParaghaph>Peso atual: {user.weight} KG</DesireParaghaph>
        </DesireContainer>
        
        <RecipeContainer>
          <DesireTitle>Dica de receita</DesireTitle>
          <Image 
            style={{
              width: 140,
              height: 140,
              marginLeft: -5,
              marginRight: 10,
              borderWidth: 1,
              borderRadius: 90
            }}
            source={{ uri: 'https://static.tuasaude.com/media/article/r8/m5/receitas-para-emagrecer-com-saude_15465_l.webp' }}
          />
          <Text>A salada com frutas é uma boa opção para quem não gosta de vegetais, pois a fruta dá um sabor mais doce à salada, melhorando o paladar e adicionando mais nutrientes à refeição.</Text>
          <RecipeParaghaph>Ingredientes:</RecipeParaghaph>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> 75 g de repolho roxo picado</Text>
            </View>
          </BulletRow>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> 75 g de manga em cubos</Text>
            </View>
          </BulletRow>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> 40 g de rebentos de soja (opcional)</Text>
            </View>
          </BulletRow>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> 60 g de tomate picado</Text>
            </View>
          </BulletRow>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> 50 g de agrião</Text>
            </View>
          </BulletRow>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> Raspas de gengibre</Text>
            </View>
          </BulletRow>
          <BulletRow>
            <View style={{ width: 10}}>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text> Vinagrete de laranja: suco de meio limão + suco de meia laranja + azeite a gosto + pimenta a gosto.</Text>
            </View>
          </BulletRow>
          <Text></Text>
          <Text><Text style={{fontWeight: 'bold' }}>Modo de preparo</Text>: Juntar todos os ingredientes e adicionar o vinagrete de laranja, misturando bem para que os legumes fiquem com o sabor do molho. Rende 2 porções.</Text>     
        </RecipeContainer>
      </Container>
    </ScrollView>
  );
};

export default Dashboard;