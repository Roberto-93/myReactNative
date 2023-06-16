

import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RouteParamList } from '../components/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationContext } from '../components/Navigator';

export type GameDetailScreenRouteProp = RouteProp<RouteParamList, 'GameDetail'>;

export type GameDetailScreenProps = {
  route: GameDetailScreenRouteProp;
};

const GameDetailScreen: React.FC<GameDetailScreenProps> = ({ route }) => {
  const { game } = route.params;
  const navigation = useNavigation<StackNavigationProp<RouteParamList>>();
  const { cartItems, setCartItems } = useContext(AppNavigationContext); // Ottieni il carrello dal contesto

  const addToCart = () => {
    setCartItems((prevCartItems) => [...prevCartItems, game]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.subtitle}>{game.consoleName}</Text>
      <Text style={styles.genre}>{game.genre}</Text>
      <Text style={styles.price}>{`Price: ${game.price} €`}</Text>
      <Text style={styles.description}>{game.description}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  genre: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign:'justify',
  },
  addToCartButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GameDetailScreen;
