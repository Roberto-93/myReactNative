
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import {Game} from '../components/Navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput } from "@react-native-material/core";

import { url} from '../components/url';

type RouteParamList = {
  Home: undefined;
  SparatuttoList: undefined;
  GameDetail: { game: Game };
};

type SparatuttoListScreenProps = {
  navigation: StackNavigationProp<RouteParamList, 'SparatuttoList'>;
};

const SparatuttoListScreen: React.FC<SparatuttoListScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/v1/Games/genre/Sparatutto`);
      setData(response.data);
      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage('Errore nella richiesta API: ' + error.message);
      } else {
        setErrorMessage('Errore sconosciuto nella richiesta API');
      }
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleItemPress = (item: Game) => {
    navigation.navigate('GameDetail', { game: item });
  };

  const renderItem = ({ item }: { item: Game }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer} >
      <TextInput
       variant="outlined" label="Nome" 
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    width:'100%',
    marginBottom:100,


  },
  container: {
    width: 320,
    height: 480,
    padding: 10,
  },
  searchInput: {
    width:300,
    marginTop:10,
    marginBottom: 10,

  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width:300,

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  title: {
    width: 100,
  },
  errorText: {
    color: 'red',
  },
});

export default SparatuttoListScreen;

