import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard, ActivityIndicator, Dimensions,SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EmailVerify from './emailVerify.js';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {Item, Input, Label } from 'native-base'
import { AuthContext } from '../Context/context ';
import  'react-native-gesture-handler';




export default class Register extends Component {
    constructor(props){
        super(props)
            this.state = {
                email:"",
                password:"",
                errorMessage: '',
                loading: null
            };

    }

handleSignUp(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
    .then(() => {this.setState({
        fullName: this.state.fullName,
        email: this.state.email.trim().toLowerCase(),
        password: this.state.password,
        loading: true
        
    }) 
    } 
  )
  .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
        
        this.setState({
            errorMessage: error.message,
            email: '',
            password: '',
            fullName: '',
            loading: null
            
        })

        setTimeout(() => {
            this.setState({
                errorMessage: ''
            })
        }, 3000)
        
      });
}

componentWillUnmount(){
    this.setState({
        email: null,
        password: null,
        errorMessage: null,
        loading: null
    })
}

  render() {
    return (
        <LinearGradient 
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        colors={['#626262', '#3d3d3d', '#161616']} 
        style={styles.linearGradient}
     >
        <TouchableWithoutFeedback
            onPress={() =>{
                Keyboard.dismiss();  
            }}>
                <KeyboardAvoidingView
                keyboardVerticalOffset = {100} 
                style={{ flex:1 }}
                behavior = {"padding"}>

        <SafeAreaView style={styles.container} >
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Register to Start Your Free Account!</Text>
            </View>
            
            <View style={styles.createInputsContainer}>
                <View style={styles.errorMessage}> 
                        <Text style={styles.errorText}>
                            {this.state.errorMessage}
                        </Text> 
                    </View>
                {
                        this.state.loading === true ?
                        <ActivityIndicator size="large" color="white" />
                        :

                        <View></View>
                    }

                                <Item style={styles.login} floatingLabel>
                                <Label style={styles.textInputsLable} >Email</Label>
                                <Input style={styles.textInputs}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email.trim().toLowerCase()}/>
                    
                                </Item>

                                <Item style={styles.login} floatingLabel >
                                <Label style={styles.textInputsLable}>Password</Label>
                                <Input style={styles.textInputs}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}/>
                                </Item>
                
                
            {this.state.email === "" || this.state.password === "" || this.state.errorMessage !== '' ? 
            
           
            <TouchableOpacity 
                disabled={true}
                    style={styles.createDisabled}
                      onPress={() =>{ this.handleSignUp()}}
                      >
                        <Text style={styles.createText}> SIGN UP </Text>
                </TouchableOpacity> 
                :
                
                <AuthContext.Consumer>
                   {(value) => (
                      <TouchableOpacity 
                        style={styles.create}
                        onPress={() =>{ this.handleSignUp() }}
                      >
                          <Text style={styles.createText}> SIGN UP </Text>
                      </TouchableOpacity> 
                    )}
                </AuthContext.Consumer>
            }
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
       
       
        </TouchableWithoutFeedback>
    
</LinearGradient>

    );
  }
}


const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,

      },
    container:{ 
        flex:1,
        justifyContent:'center', 
        alignItems: 'center', 
        marginTop: Dimensions.get('window').height / 12 * -1,
        height: Dimensions.get('window').height,
    },
    textInputsLable:{
        color:'rgba(255,255,255, .6)',
        fontSize: 16
    },
    errorMessage:{
        width: '100%'     
    },
    errorText:{
        fontSize: 16,
        margin: 10,
        color: 'white'
    },
    
    createInputsContainer:{
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 0,
        marginTop: 0
  
    },
    login:{
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: 'rgba(255, 255, 255, .95)',
        width: 300,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        padding:5,
        marginBottom: '1%'
        
        
    },
    textInputs:{
        color: 'white',
        fontSize: 18
    },
    title:{
        fontSize:30, 
        color:'white',
        textAlign:'center',
        letterSpacing:1,
        
 
    },
    create:{
        backgroundColor: 'white',
        padding:10,
        // marginBottom: 50,
        marginTop: '15%',
        width: 300,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        
    },
    createDisabled:{
        backgroundColor: 'gray',
        padding:10,
        // marginBottom: 50,
        marginTop: '15%',
        width:300,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    createText:{
        color: 'black',
        fontSize: 16,
        textAlign:'center'
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        width:'90%',
        textAlign:'center',
        
    }
})