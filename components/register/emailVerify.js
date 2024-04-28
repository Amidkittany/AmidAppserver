import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { AuthContext } from '../Context/context ';
import 'react-native-gesture-handler';
import { Item, Input, Label, Form } from 'native-base'


export default class EmailVerify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: "",
            emailSent: "",
            errorMessage: ''
        };

    }

    verifyEmail(){
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in
              console.log(user.emailVerified)
            } else {
              // No user is signed in
              this.setState({

                        errorMessage: "Email is not verified"
                    })
              
            }
          });

        console.log(this.state.errorMessage)
    }



    // componentWillUnmount(){
    //     this.setState({
    //         fullName: null,
    //         email: null,
    //         password: null,
    //         errorMessage: null
    //     })
    // }

    render() {
        let handlePasswordReset = this.handlePasswordReset.bind(this)

        return (

            <KeyboardAvoidingView
                keyboardVerticalOffset={70}
                style={{ flex: 1 }}
                behavior="padding" >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>

                    <View style={styles.container} >
                        <Text style={styles.textheader}>Enter your email to recieve a link to reset your password</Text>
                        <View style={{ marginTop: 75, width: "100%", justifyContent:'center', alignItems:'center' }}>
                            <Text style={styles.errorMessage}>
                                {this.state.errorMessage}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => verifyEmail() }
                        >
                            <Text style={styles.sendLink}>EmailVerify</Text>
                        </TouchableOpacity>
                    </View>


                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: '100%',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white'
    },
    text: {
        color: 'black',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center'

    },
    sendLink:{
       color: 'white',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    errorMessage: {
        color: 'red',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    login:{

        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    textheader: {
        color: 'black',
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 40
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 30,
        borderRadius: 25,
        backgroundColor: 'black',
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
    },
    textInputs: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 50,
        padding: 5,
        fontSize: 22,
        
    }
})