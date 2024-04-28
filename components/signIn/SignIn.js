/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView, Linking, ActivityIndicator, Dimensions, SafeAreaView, Platform } from 'react-native';
import {Item, Input, Label } from 'native-base'



import 'react-native-gesture-handler';

import * as firebase from 'firebase';
import { AuthContext } from '../Context/context ';



export default class SignIn extends Component {
    constructor(props){
        super(props)
            this.state = {
              email: "",
              password:'',
              errorMessage: '',
              loading: null
            }
    }

handleSignIn(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
        this.setState({
            loading: true,
        })
    })
    .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
        this.setState({
            errorMessage: error.message + " Please try again!",
            email: "",
            password:'',
            loading: null
        }),
        setTimeout(()=> {
            this.setState({
                errorMessage: null
            })
        },5000)
      });
   
}

componentWillUnmount(){
    
    this.setState({
        errorMessage: null,
        email: "",
        password:'',
        loading: null
    })
}
    


  render() {
    
    return (
        // <KeyboardAvoidingView
        //         keyboardVerticalOffset = {0} // adjust the value here if you need more padding
        //         style = {{ flex: 1 }}
        //         behavior = {Platform.OS == "ios" ? "padding" : "height"} >
        <ImageBackground
        style={styles.imageBackground}
        source= {require('../images/grayscale-photo-of-woman-1399073.jpg')}
        >
            {/* <KeyboardAvoidingView
                keyboardVerticalOffset = {0} // adjust the value here if you need more padding
                style = {{ flex: 1 }}
                behavior = {Platform.OS == "ios" ? "padding" : "height"} > */}
            <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();  
          }}>
            <SafeAreaView style = {styles.homeContainer}>
            <KeyboardAvoidingView
                keyboardVerticalOffset = {20} // adjust the value here if you need more padding
                style = {{ flex: 1, alignItems:'center' }}
                behavior = {Platform.OS == "ios" ? "padding" : "height"} 
            >
                <View style={styles.welcomeHeader}> 
                    <Text style={styles.welcomeText}>
                        Welcome to SalonSort, login to get started!
                    </Text> 
                </View>

                <View 
                style = {styles.userContainer}
                >
                    <View style={{ width: 300}}> 
                        <Text style={{color: 'lightgray', fontSize:18, fontFamily: 'arial', fontWeight: '900', textAlign:'center'}}>
                            {this.state.errorMessage}
                        </Text> 
                    </View>
                    <View 
                    style = {styles.loginContainer}
                    >
                                <Item style={styles.login} floatingLabel>
                                <Label style={styles.textInputsLable} >Email</Label>
                                <Input style={styles.textInputs}
                        onChangeText={email => this.setState({email:email.toLowerCase().trim()})}
                        value={this.state.email}/>
                    
                                </Item>
                                <Item style={styles.login} floatingLabel >
                                <Label style={styles.textInputsLable}>Password</Label>
                                <Input style={styles.textInputs}
                        onChangeText={password => this.setState({password:password})}
                        value={this.state.password}
                        secureTextEntry = {true}/>
                                </Item>
                                               
                    </View>
                    {
                        this.state.loading === true ?
                        <ActivityIndicator size="large" color="white" />
                        :

                        <View></View>
                    }
                    
                     <AuthContext.Consumer>
                     
                         {(value) => (
                            <TouchableOpacity 
                            style={styles.loginBtn}
                            onPress={() =>{value.logInUser, 
                            this.handleSignIn()}
                                
                            }
                            >
                                <Text style={styles.text}>LOGIN</Text>
                            </TouchableOpacity>
                         )}
                            
                            </AuthContext.Consumer>
                            <TouchableOpacity 
                        style={{marginBottom: '3%'}}
                        onPress={() => this.props.navigation.navigate('PasswordReset')}>

                        <Text style={styles.registerText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{marginTop: '3%'}}
                        onPress={() => this.props.navigation.navigate('Register')}
                        >
                        <Text style={styles.registerText}>Not registered? Create account</Text>
                    </TouchableOpacity>

                    
                    <TouchableOpacity 
                    style={{marginTop: '3%'}}
                    onPress={() => Linking.openURL('https://www.termsfeed.com/privacy-policy/28f635cc04cbd9084902d65e838c9cda')}
                    >
                        <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
            </TouchableWithoutFeedback>
            {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    //   </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
    imageBackground:{
        flex:1,
        width: '100%',
        height: Dimensions.get('window').height,
    },
    welcomeHeader:{
        flex:1,
        width: '90%',
        textAlign:'center',
        marginBottom:-5,
    },
    welcomeText:{
        fontSize: 35,
        textAlign: 'center',
        opacity: .9,
        fontFamily: 'Baskerville',
        letterSpacing: .5,
        color: "white",
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop:25,
        letterSpacing: 1.1,
    },
    homeContainer:{
        flex:2,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: 'rgba(0, 0, 0, .65)',
        width: '100%',
        height: Dimensions.get('window').height,
        
        
        
    },
    textInputs:{
        color: 'white',
        fontSize: 20
    },
    textInputsLable:{
        color:'rgba(255,255,255, .8)',
        fontSize: 16,
        
        
    },

    userContainer:{ 
        flex:3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',  
    },
    loginContainer:{
        marginTop: 15, 
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',

    },
    login:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:'5%',
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: 'white',
        width: 300,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
        

    },
    loginBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%',
        marginBottom:'12%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: 300,
        backgroundColor: 'rgba(229, 240, 255, 1)',  
        paddingTop: 10,
        paddingBottom: 10,
    },
    register:{
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: '60%',
        backgroundColor: '#EAFEFF',  
        paddingTop: 10,
        paddingBottom: 10,
        
    },
    viewClientsText:{
        color: 'white',
        fontSize: 25,
        letterSpacing: 5
    },
    text:{
        color: 'black',
        fontSize: 18,
        letterSpacing: 4,
        fontWeight:'bold'
    },
    registerText:{
        color:'white',
        fontSize:18,
        // paddingTop: 20
    },
    privacyPolicyText:{
        color:'white',
        fontSize:14,
        paddingTop: 20,
        fontStyle: 'italic' 
    }
})