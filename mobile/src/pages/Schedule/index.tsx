import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Schedule: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [dates, setDates] = useState([]);
  const [load, setLoad] = useState(false);

  const { user } = useAuth();
  const label = user.name.substr(0,1).toUpperCase();

  useEffect(() => {
    (async() => {
      const [token] = await AsyncStorage.multiGet([
        '@FitLife:token',
      ]);
      
      //const schendules = await api.get('/schendules?dateInit=2021-01-01&dateEnd=2021-01-31', {
      const schendules = await api.get('/schendules', {
        headers: {
          'Authorization': `Bearer ${token[1]}`
        }
      });

      const newSchendules = schendules.data.map(schendule => {
        schendule['add'] = false;
      });

      setDates(schendules.data);
    })();
  }, []);

  const loadItems = (day) => {
    setTimeout(() => {
      if (!load) {
        for (let item = 0; item < dates.length; item++) {
          const dateCalendar = dates[item].date.split('T')[0];
          
          if (!items[dateCalendar]) {
            items[dateCalendar] = [];
          }
          
          items[dateCalendar].push({
            pos: item,
            name: dates[item].description,
            date: dateCalendar,
            hour: dates[item].date.split('T')[1],
            data: dates[item],
          });
        }
        
        const newItems = {};

        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        
        setItems(newItems);
        setLoad(true);
    }
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity 
        style={{marginRight: 10, marginTop: 17}}
      >
        <Card
          onPress={() => navigation.navigate("CalendarDetail", item)}
        >
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text 
                label={label}
                color="#FFF"
                style={{
                  backgroundColor: "#44C52F"
                }}
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;