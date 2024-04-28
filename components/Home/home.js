import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Alert, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';

import { AuthContext } from '../Context/context ';

export default class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: "",
            password: '',
            errorMessage: null,
            user: "",
        };
    }

    componentDidMount() {
        this._isMounted = true;
        firebase.auth().onAuthStateChanged((user) => {
            if (user && this._isMounted === true) {
                this.setState({
                    email: user.email,
                    user: user,
                });
            } else {
                return;
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({
            user: null,
            email: null,
        });
    }

    handleSignOut = async () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', onPress: () => { return; }, style: 'cancel' },
                {
                    text: 'Yes, Sign Out', onPress: async () => {
                        try {
                            await fetch('your-server-url/deleteProduct', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: this.state.name, // You need to set the product name
                                }),
                            });
                            firebase.auth().signOut();
                        } catch (error) {
                            console.error('Error signing out:', error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    render() {
        return (
            <ImageBackground
                style={styles.imageBackground}
                source={require('../images/alternate-background-image.jpg')}
            >
                <SafeAreaView style={styles.homeContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome to SalonSort</Text>
                        <Text style={styles.welcomeSubText}>Begin managing your clientele's notes by selecting view clients.</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.viewClient}
                        onPress={() => this.props.navigation.navigate('Clients')}
                    >
                        <Text style={styles.viewClientsText}>View Clients</Text>
                    </TouchableOpacity>

                    <AuthContext.Consumer>
                        {(value) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() => { value.logOutUser, this.handleSignOut() }}
                                >
                                    <Text style={styles.text}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </AuthContext.Consumer>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    homeContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        width: '100%',
    },
    welcomeContainer: {
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 40,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, .8)',
        fontWeight: '900',
        fontFamily: 'Arial',
        letterSpacing: 1.5
    },
    welcomeSubText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, .9)',
        fontWeight: '300',
        fontFamily: 'Arial',
        fontStyle: 'italic',
        padding: 20,
        letterSpacing: 1
    },
    viewClient: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(151, 232, 213, .6)',
    },
    text: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 18,
        padding: 10,
    }
});