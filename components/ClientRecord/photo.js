
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Modal } from 'react-native';



export default class Photo extends Component {
    
     
 
    render() {
      
    const ScreenWidth = Dimensions.get('window').width;
   
      return (
        
          <View>
            
            <Image source={this.props.singlePhoto} style={styles.photos}/>
          </View>
      

      );
    }
}

const styles = StyleSheet.create({
  photos:{
    width: '100%',
    height: '100%',
    margin:0,
    
    
  }
})