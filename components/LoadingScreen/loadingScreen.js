import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default class LoadingScreen extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../images/Logo.png')} />
          <Text style={styles.header}>SalonSort</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
          <ActivityIndicator size='large' color='lightblue' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  header: {
    fontSize: 60,
    textAlign: 'center',
    color: 'rgba(0,0,0, .8)',
    fontWeight: '900',
    fontFamily: 'Snell Roundhand',
    letterSpacing: 1.5,
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginVertical: 20,
  },
});
