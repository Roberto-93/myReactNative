
import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RouteParamList, Game, AppNavigationContext } from '../components/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';

interface GameWithTotalPrice extends Game {
  totalPrice: string;
}

type CartScreenRouteProp = RouteProp<RouteParamList, 'Cart'>;

type CartScreenNavigationProp = StackNavigationProp<RouteParamList, 'Cart'>;

type CartScreenProps = {
  route: CartScreenRouteProp;
  navigation: CartScreenNavigationProp;
};

const CartScreen: React.FC<CartScreenProps> = ({ route, navigation }) => {
  const { cartItems, setCartItems } = useContext(AppNavigationContext);

  

  const handleRemoveItem = (game: Game) => {
    const updatedCartItems = [...cartItems];
    const gameIndex = updatedCartItems.findIndex((item) => item.title === game.title);
  
    if (gameIndex !== -1) {
      updatedCartItems.splice(gameIndex, 1);
      setCartItems(updatedCartItems);
    }
  };

  const getUniqueCartItems = (cartItems: Game[]): GameWithTotalPrice[] => {
    const uniqueCartItems: GameWithTotalPrice[] = [];
    const gameTitleMap: { [title: string]: number } = {};

    cartItems.forEach((item) => {
      if (!gameTitleMap[item.title]) {
        uniqueCartItems.push({ ...item, quantity: 1, totalPrice: item.price.toFixed(2) });
        gameTitleMap[item.title] = 1;
      } else {
        gameTitleMap[item.title]++;
        const existingItem = uniqueCartItems.find((i) => i.title === item.title);
        if (existingItem) {
          existingItem.quantity = gameTitleMap[item.title];
          existingItem.totalPrice = (existingItem.price * existingItem.quantity).toFixed(2);
        }
      }
    });

    return uniqueCartItems;
  };

  const uniqueCartItems = getUniqueCartItems(cartItems);

  const totalPrice = uniqueCartItems.reduce((total, game) => total + Number(game.totalPrice), 0).toFixed(2);

  const renderItem = ({ item }: { item: GameWithTotalPrice }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.sizefont}>{item.title}</Text>
          {item.quantity && <Text style={styles.quantity}>Quantità: {item.quantity}</Text>}
          <Text style={styles.sizefont}>Prezzo: {item.totalPrice} €</Text>
        <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Elimina</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>Totale: {totalPrice} €</Text>
      <FlatList
        data={uniqueCartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContainer}
      />
     
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap:'wrap'
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 150,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    marginVertical: 10,
    borderRadius: 20,
  },
  sizefont: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 16,
    color: 'gray',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  image: {
    width: '100%',
    height: 150,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default CartScreen;






