

import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppNavigationContext, AppNavigationProp } from './Navigator';
import { useNavigation } from '@react-navigation/native';

const CartButton: React.FC = () => {
  const { cartItems } = useContext(AppNavigationContext);
  const navigation = useNavigation<AppNavigationProp>();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const handlePress = () => {
    navigation.navigate('Cart', { cartItems });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cart}>

      <Ionicons name="cart-outline" size={24} color="black" />
      {cartItemCount > 0 && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{cartItemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  cart: {
    paddingRight: 10,
  },
  notification: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
  },
});

export default CartButton;
