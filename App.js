

import React, { Component } from 'react';
import { Button, YellowBox} from 'react-native';


import AddClientInfo from './components/addClient/addClient'
import Home from './components/Home/home'
import SingleClientInfo from './components/SingleClientInfo/singleClientInfo'
import Register from './components/register/register'
import LoadingScreen from './components/LoadingScreen/loadingScreen'
import SignIn from './components/signIn/SignIn'


import ContactInfo from './components/SingleClientInfo/contactInfo'




import 'react-native-gesture-handler';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from 'firebase';
import { AuthContext } from './components/Context/context'
// import {YellowBox} from 'react-native';

// تهيئة Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const storage = firebase.storage();

// تحديد Stack و AuthStack للتنقل بين الصفحات
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Welcome"
      component={SignIn}
      options={
        { title: " " ,
        headerStyle: {
          backgroundColor: 'rgba(166, 211, 232, .5)',
        },
      }
    } 
    />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{ title: "إنشاء حساب" }}
    />
  </AuthStack.Navigator>
);

export default class App extends Component {
  _isMounted = false;
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      userToken: null,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if(user && this._isMounted === true){
        this.setState({
          userToken: user,
          isLoading: false,
          isLoggedIn: true
        })
      } else {
        this.setState({
          isLoggedIn: false,
          isLoading: false
        })
      }
    });
  }

  componentWillUnMount(){
    this._isMounted= false;
  }

  logIn(){
    this.setState({
      isLoggedIn: true,
    })
  }

  logOut(){
    firebase.auth().signOut();
    this.setState({
      isLoggedIn:false,
      userToken: null
    })
  }

  render() {
    if (this.state.isLoading) {
      // لم يتم الانتهاء من التحقق من التوكين بعد
      return <LoadingScreen />;
    }

    // تحديد قيمة السياق للمستخدم المسجل الحالي
    const value = {
      logOutUser: this.logOut,
      logInUser: this.logIn,
      user: this.state.userToken
    }

    return (
      <AuthContext.Provider value = {value}>
        <NavigationContainer>
          {this.state.userToken && this.state.isLoggedIn === true? 
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} 
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Clients" component={AddClientInfo} 
                options={{
                  title: "SalonSort" ,
                  headerStyle: {
                    backgroundColor: 'white',
                  },
                  headerTitleStyle:{
                    fontStyle: 'italic',
                    fontSize: 22,
                  },
                  headerBackTitle :'Home',
                  headerBackTitleStyle: {color: 'black'}
                }}
              />
              <Stack.Screen name="SingleClientInfo" component= {SingleClientInfo} 
                options={({ route, navigation }) => (
                  console.log(route.params.params),
                  { 
                    title: route.params.params.name.charAt(0).toUpperCase() + route.params.params.name.slice(1),
                    key: route.params.key,
                    headerBackTitle :'Client List',
                    headerBackTitleStyle: {color: 'black'},
                    headerTitleStyle:{
                      fontStyle: 'normal',
                      fontSize: 22,
                    },
                    headerStyle: {
                      backgroundColor: 'white',
                    },
                    headerRight: () => (
                      <Button
                        onPress={() => {
                          navigation.navigate('Contact',{
                            params:{  
                              name: route.params.params.name,
                              key: route.params.params.key
                            },  
                          })
                        }}
                        title="Contact"
                        color="black"
                      />
                    ),
                  }
                )}
              />
              <Stack.Screen name="Contact" component= {ContactInfo} 
                options={({ route,}) => (
                  { 
                    title:  route.params.params.name,
                    headerStyle: {
                      backgroundColor: 'white',
                    },
                    headerTitleStyle:{
                      fontSize: 22,
                    },
                    headerBackTitle :'Home',
                    headerBackTitleStyle: {color: 'black'}
                  }
                )}
              />
            </Stack.Navigator> 
            : 
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="Welcome"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <AuthStack.Screen
                name="Register"
                component={Register}
                options={{
                  title: "SalonSort" ,
                  headerStyle: {
                    backgroundColor: 'white',
                  },
                  headerTitleStyle:{
                    fontStyle: 'italic',
                    fontSize: 22
                  },
                  headerBackTitle :'Login',
                  headerBackTitleStyle: {color: 'black'}
                }}
              />
            </AuthStack.Navigator>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}



  