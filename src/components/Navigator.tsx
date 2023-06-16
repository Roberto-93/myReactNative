


import React, { createContext, useState } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CartButton from './CartButton';
import HomeScreen from '../Screen/HomeScreen';
import DataListScreen from '../Screen/DataListScreen';
import AvventuraListScreen from '../Screen/AvventuraListScreen';
import AzioneListScreen from '../Screen/AzioneListScreen';
import GDRListScreen from '../Screen/GDRListScreen';
import SparatuttoListScreen from '../Screen/SparatuttoListScreen';
import GameDetailScreen from '../Screen/GameDetailScreen';
import CartScreen from '../Screen/CartScreen';

export type Game = {
  title: string;
  consoleName: string;
  genre: string;
  price: number;
  image: string;
  description: string;
  quantity?: number;
};

export type RouteParamList = {
  Home: undefined;
  DataList: undefined;
  AvventuraList: undefined;
  AzioneList: undefined;
  GDRList: undefined;
  SparatuttoList: undefined;
  GameDetail: { game: Game };
  Cart: { cartItems: Game[] };
};

export type AppNavigationProp = StackNavigationProp<RouteParamList>;

const Stack = createStackNavigator<RouteParamList>();

export const AppNavigationContext = createContext<{ 
  cartItems: Game[] ;
  setCartItems: React.Dispatch<React.SetStateAction<Game[]>>;
}>({
  cartItems: [],
  setCartItems: () => {},

});


const Navigator = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]);

  const headerOptions = {
    headerRight: () => (
        <CartButton />
    ),
  };

  return (
    <AppNavigationContext.Provider value={{ cartItems,setCartItems  }} >

    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Home" component={HomeScreen} options={headerOptions} />
        <Stack.Screen name="DataList" component={DataListScreen} options={headerOptions} />
        <Stack.Screen name="AvventuraList" component={AvventuraListScreen} options={headerOptions} />
        <Stack.Screen name="AzioneList" component={AzioneListScreen} options={headerOptions} />
        <Stack.Screen name="GDRList" component={GDRListScreen} options={headerOptions} />
        <Stack.Screen name="SparatuttoList" component={SparatuttoListScreen} options={headerOptions} />
        <Stack.Screen name="GameDetail" component={GameDetailScreen} options={headerOptions} />
        <Stack.Screen name="Cart" component={CartScreen} initialParams={{ cartItems: [] }} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </AppNavigationContext.Provider>

  );
};




export default Navigator;
