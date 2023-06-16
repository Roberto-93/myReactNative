

import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RouteParamList } from '../components/Navigator';
// import { AppNavigationContext, Game } from '../components/Navigator';

type HomeScreenProps = {
  navigation: NavigationProp<RouteParamList, 'Home'>;
  route: RouteProp<RouteParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const handleDataListPress = () => {
    navigation.navigate('DataList');
  };

  const handleAvventuraListPress = () => {
    navigation.navigate('AvventuraList');
  };

  const handleAzioneListPress = () => {
    navigation.navigate('AzioneList');
  };

  const handleGDRListPress = () => {
    navigation.navigate('GDRList');
  };

  const handleSparatuttoListPress = () => {
    navigation.navigate('SparatuttoList');
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        
        <TouchableOpacity onPress={handleDataListPress} style={styles.genreContainer1}>
          <ImageBackground
                source={require('../../assets/Action.jpg')}
                style={styles.genreBackground}
                >
                <Text style={styles.genreText}>Tutti</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        
            <TouchableOpacity onPress={handleAvventuraListPress} style={styles.genreContainer1}>
                <ImageBackground
                source={require('../../assets/uncharted.jpg')}
                style={styles.genreBackground}
                >
                <Text style={styles.genreText}>Avventura</Text>
                </ImageBackground>
            </TouchableOpacity>
        <View style={styles.containerG}>

            <TouchableOpacity onPress={handleAzioneListPress} style={styles.genreContainer}>
                <ImageBackground
                source={require("../../assets/assassin's creed odyssey.jpg")}
                style={styles.genreBackground}
                >
                <Text style={styles.genreText}>Azione</Text>
                </ImageBackground>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={handleGDRListPress} style={styles.genreContainer}>
                <ImageBackground
                source={require('../../assets/final fantasy xv.jpg')}
                style={styles.genreBackground}
                >
                <Text style={styles.genreText}>GDR</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
            <TouchableOpacity onPress={handleSparatuttoListPress} style={styles.genreContainer1}>
                <ImageBackground
                source={require('../../assets/rainbowsx.jpg')}
                style={styles.genreBackground}
                >
                <Text style={styles.genreText}>Sparatutto</Text>
                </ImageBackground>
            </TouchableOpacity>
          
       </View> 
    </View>
  );
};


const styles = StyleSheet.create({
  container1: {
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 10,
  },
  containerG: {
    flexDirection: 'row',
    width: 350,
    justifyContent: 'space-between',
  },
  genreContainer1: {
    width: 350,
    height: 130,
    marginVertical: 10,
    borderRadius: 20,
   
  },
  genreContainer: {
    width: 170,
    height: 130,
    marginVertical: 10,
    borderRadius: 5,
  },
  genreBackground: {
    width: '100%',
    height: '100%',
  },
  genreText: {
    height: '100%',
    fontSize: 24,
    paddingTop:50,
    fontWeight: 'bold',
    opacity: 0.4,
    backgroundColor: 'white',
    textAlign:'center',
   
    
  },
});




export default HomeScreen;
