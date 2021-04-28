import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image , Picker} from 'react-native';

function Home({navigation}) {

  return (
    <ImageBackground
      source={require('../assets/logo.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>GitRamadan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          
          <Text style={styles.login}>Products</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%'
  },
  login: {
    backgroundColor: '#40407a',
    color: 'white',
    width: 200,
    borderRadius: 25,
    textAlign: 'center',
    padding: "2%",
    fontSize: 27,
  }
});
export default Home;