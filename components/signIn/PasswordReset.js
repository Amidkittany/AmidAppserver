import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native';


import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { AuthContext } from '../Context/context ';
import 'react-native-gesture-handler';
import { Item, Input, Label, Form } from 'native-base'


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: "",
            emailSent: "",
            errorMessage: '',
            loading:null
        };

    }

    handlePasswordReset(){

        var auth = firebase.auth();
        
        console.log(this.state.email)
        let email = this.state.email
        auth.sendPasswordResetEmail(email).then( () => {
            // Email sent
               this.setState({
                errorMessage: "Please check email, then login once the password has been changed",
                loading: true
            })
            
        }).catch((error) => {
            // console.log(error)
                this.setState({
                errorMessage: error.message
            })
            

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
                keyboardVerticalOffset={25}
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
                        <KeyboardAvoidingView
                            keyboardVerticalOffset={0}
                            style={{justifyContent:'center', alignItems:'center'}}
                            behavior="padding" >
                            <View>
                            {
                                this.state.loading === true ?
                                <ActivityIndicator size="large" color="black" />
                                :

                                <View></View>
                            }
                            <Form style={{marginLeft: -15}}>
                                <Item style={styles.login} floatingLabel>
                                    <Label style={styles.textInputsLable} >Email</Label>
                                    <Input style={styles.textInputs}
                                        onChangeText={email => this.setState({ email: email.toLowerCase().trim() })}
                                        value={this.state.email} />

                                </Item>
                            </Form>
                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={() => handlePasswordReset() }
                            >
                                <Text style={styles.sendLink}>Send Link</Text>
                            </TouchableOpacity>
                            </View>
                            </KeyboardAvoidingView>


                    </View>


                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 0,
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
        justifyContent:'center',
        alignItems: 'center',

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
        lineHeight: 40,
        width: 300,
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 30,
        borderRadius: 25,
        backgroundColor: 'black',
        width: 300,
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