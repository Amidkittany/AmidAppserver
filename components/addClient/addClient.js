import React, { Component } from 'react';
import { Text, View, TextInput,Button, TouchableOpacity, StyleSheet, ScrollView, Keyboard, Modal,TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import {  Icon,  } from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-community/async-storage';

import { Directions } from 'react-native-gesture-handler';


export default class AddClientInfo extends Component {
    constructor(props){
        super(props)
            this.state = {
              clients: [],
              addingClient: "",
              modalVisible: false,
              targetItem:'',
              searching:''
            };


    }

    componentDidMount(){
      this.getClients("allClientsKey").then(clients => {
        if(clients){
          let clientsParsed = JSON.parse(clients);

          this.sortClients(clientsParsed);

          // console.log(clientsParsed);

        this.setState({
          clients: clientsParsed
        })
      }
      });

     
      //this.getAllKeys()


// console.log(this.state.clients)
// this.clearItem('undefinedundefined')
    

}




    // getAllKeys = async () => {
    //   let keys = []
    //   try {
    //     keys = await AsyncStorage.getAllKeys()
    //   } catch(e) {
    //     // read key error
    //   }
    
    //   console.log(keys)

    //   // example console.log result:
    //   // ['@MyApp_user', '@MyApp_key']
    // }

    getClients = async (key) => {
      try {
        const clients = await AsyncStorage.getItem(key)
        if(clients){
        if(clients !== null) {
          // value previously stored
          if (clients !== null) {
                      return clients
                    }else{
                      // console.log("clients error")
                    }
        }
      }
      } catch(e) {
        // error reading value
        alert(e);
      }
    
    }


sortClients(array) {
  array.sort((a,b) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
  })

}



    clearItem = async (key) => {
      if(key){
        await AsyncStorage.removeItem(key);
      }else{
        return
      }
      

    };


    // searchClientList(text){
    //   let clients = [...this.state.clients]
    //   let filteredClients = clients.filter((item) => {

    //       const itemData = `${item.name.toUpperCase()}`;

    //       const textData = `${text.toUpperCase()}`;
    //       console.log(itemData);
    //       console.log(textData);
    //       return itemData.indexOf(textData) > -1
    //   });

      

    //   this.setState({
    //     clients: filteredClients,
    //     searching: text
    //   })
      

    // }

async updateClients(clients) {
    try {
      await AsyncStorage.removeItem('allClientsKey');
      await AsyncStorage.setItem('allClientsKey',JSON.stringify(clients));
      return clients;
    } catch (error) {
      alert(error)
    }
   
     };

randomKey(list){
  list.map((key) => {
    if(key === list.key){
      alert(`try again`)
      return this.randomKey()
    }else{
      console.log(`${key} not same`)
      let key =key
    }
    return key
  })

}

    async addClient(){
      if(this.state.addingClient == ""){
        alert('Please Add Client')
      }else {
        let clients = [...this.state.clients];
        this.randomKey(clients);
        clients.push({name: this.state.addingClient,
                    key: Math.floor((Math.random() * 10000) + 1).toString(),
                    editMode: false
                      })

        this.updateClients(clients);
        this.sortClients(clients);

        this.setState({
          clients: clients,
          addingClient: "",
        })
      }
      // console.log(this.state.clients)
    }

    deleteClient(key){
      let clients = [...this.state.clients];
      const index = clients.findIndex(item => item.key === key);
      let notesInfo = `${clients[index].key}${clients[index].name}`
      // console.log(notesInfo);
      let contactInfo = `${clients[index].key}${clients[index].name}contact`
    
      Alert.alert(
        'Confirm',
        'This will delete all of the clients notes, are you sure?',
        [
          {text: 'Cancel', onPress: () => {return}, style: 'cancel'},
          {text: 'DELETE!', onPress: () => {clients.splice(index, 1),
            this.updateClients(clients),
            this.setState({clients: clients})
            this.clearItem(notesInfo)
            this.clearItem(contactInfo)
          }}
        ],
        { cancelable: false }
      )
      
    }

    closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
      }
  };
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  addClientHideModal(){
    this.setModalVisible(!this.state.modalVisible);
    //this.addClient
  }


 findEditIndex(targetItem){
  this.state.clients.map((item) => {
    if(item.key === targetItem){
      item.editMode = !item.editMode
      this.setState({
        targetItem: ''
      })
    }
  })
}

  saveEditClient(targetItem){ 
      this.state.clients.map((item) => {
        if(item.key === targetItem){
          item.name = this.state.addingClient
          this.updateClients(this.state.clients);
          this.setState({
            
            addingClient: "",
          })
        
        }
      })
  }

  render() {



const renderItem = data => {
  
    if(data.item.editMode === false){
    // return <View><Text>{data.item.editMode} false</Text></View>
    return <View style= {styles.eachItemContainer}>
          
         <TouchableOpacity
        style={{width: '100%',padding:0 }}
             onPress={() => {
               this.props.navigation.navigate('SingleClientInfo',{
                //  screen: 'Notes',
                  params:{  name: data.item.name,
                     key: data.item.key
                  },
                  
                }
               )}}
            // underlayColor={'#AAA'}
         >
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width:'95%', alignItems:'center'}}>
               <Text style={styles.listText}>
                   {data.item.name}
                 </Text>
  
                <Icon name="right" size={25} />
                 
                
          </View>
        </TouchableOpacity>
      </View>
     
    }else if(data.item.editMode === true){
      return <View style= {styles.eachItemContainer}>

      <View style= {{flexDirection: 'row', justifyContent: 'space-between', width:'100%', margin:0}}>
      
        <TextInput 
          style = {styles.editClientTextInput}
          placeholder="Enter Client!"
          placeholderTextColor ='black'
          onChangeText={(addingClient) => this.setState({addingClient})}
          value={this.state.addingClient}          
        />
        <TouchableOpacity 
        style={styles.cancelSave}
        onPress = {()=> {
          this.saveEditClient(data.item.key);
          this.findEditIndex(data.item.key)
        }}>
              <Text 
              style={styles.cancelSaveText}
              
              >Save</Text>
              
            </TouchableOpacity>
  
            <TouchableOpacity 
            style={styles.cancelSave}
            onPress = {()=> {
              this.findEditIndex(data.item.key)
            }}>
              <Text style={styles.cancelSaveText}>Cancel</Text>
              
            </TouchableOpacity>
      </View>
    
  </View>
    }
  }
  
  
 
  

const renderHiddenItem = (data, rowMap) => (
  <View style={styles.deleteBtnContainer}>
      <TouchableOpacity
          style={styles.editName}
          onPress = {()=>{
            this.setState({
              addingClient: data.item.name,
            })
            this.findEditIndex(data.item.key),
            this.closeRow(rowMap, data.item.key)
          }
          }
      >
        <Icon name="edit" size={30} style={{color: 'white'}} />
          <Text style={styles.editNameText}>Edit</Text>
      </TouchableOpacity>
      <View>
      <TouchableOpacity
      style={styles.delete}
          onPress={() => this.deleteClient(data.item.key)}
      >
          <Icon name= 'delete' style={{color: 'white',fontSize:30}}/>
          
      </TouchableOpacity>
      </View>
  </View>
);



    return (
      <TouchableWithoutFeedback onPress={() =>{
        Keyboard.dismiss();  
      }}>
        <View style= {{flex:1, backgroundColor: 'white'}}>
        {/* <TextInput 
          style = {styles.editClientTextInput}
          placeholder="Search"
          onChangeText={(text) => this.searchClientList(text)}
          value={this.state.searching}          
        /> */}
          <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ececec'}}>
          <TouchableOpacity
                  style ={styles.addButton}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}>
                    <Icon name= 'plus' size={30} color={'darkblue'}/>
                    {/* <Text style={{color: 'black', fontSize: 25, }}>Add Client</Text> */}
                  </TouchableOpacity> 
          </View>


          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <TouchableWithoutFeedback onPress={() =>{
                      Keyboard.dismiss();  
                    }}>
              
              <KeyboardAvoidingView 
              keyboardVerticalOffset={20} 
               style ={styles.addClientScreen}
               behavior={'padding'}
              >
                
              <View style={{flex:1, alignItems:'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                  <TouchableOpacity
                  style={{width: 75}}
                      onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                    >
                      <Icon name= 'down' size={40} style ={{textAlign: 'center',marginTop: '5%',color: 'white'}}/>
                      
                    </TouchableOpacity>
                </View>
             
                  <TextInput 
                    style = {styles.addClientTextInput}
                    placeholder="Client Name"
                    placeholderTextColor= "rgba(255, 255, 255, .5)"
                    onChangeText={(addingClient) => this.setState({addingClient})}
                    value={this.state.addingClient}
                    
                  />
                  {this.state.addingClient === "" ? 

                    <TouchableOpacity
                    style={{
                      textAlign: 'center', 
                      width: 300 ,
                      height: 40, 
                      backgroundColor: 'rgba(166, 211, 232, .1)', 
                      marginTop: 25, 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      borderRadius: 50,
                    }}
                      onPress={this.addClient.bind(this)}
                      onPressOut={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    > 
                    <Icon name= 'adduser' size= {30} style ={styles.submitClient}/>
                    {/* <Text style ={styles.submitClient}> ADD</Text> */}
                </TouchableOpacity>
              :
              <TouchableOpacity
                  style={styles.submitClientBtn}
                    onPress={this.addClient.bind(this)}
                    onPressOut={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  > 
                    <Icon name= 'adduser' size= {30} style ={styles.submitClient}/>
                    
                </TouchableOpacity>  
              }

                
          </View>
              </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
          </Modal>
        <KeyboardAvoidingView 
        behavior={'padding'} 
        keyboardVerticalOffset={50}
        style={{flex:1}}
        >
                  <View style = {styles.listContainer}>
                      <SwipeListView
                        data={this.state.clients}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={0}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        friction = {100}
                        closeOnScroll ={true}
                        disableRightSwipe={true}
                        closeOnRowPress={true}
                        // onRowDidOpen={onRowDidOpen}
                    />
                  </View>  
          </KeyboardAvoidingView>
</View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  addButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(166, 211, 232, .5)',
    padding: 10,
    width: 50,
    height: 50,
    margin: 'auto',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 50,

  },
  submitClientBtn:{
    textAlign: 'center', 
    width: 300 ,
    height: 40, 
    backgroundColor: 'rgba(166, 211, 232, 1)', 
    margin:10,
    marginTop: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 50,
    
  },
  submitClient:{
    color:'black', 
  },
  
  addClientScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '75%',
    width:'100%',
    backgroundColor:'rgba(74, 74, 74, 1)',
    marginTop: "20%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    
  },
  cancelSave:{
    width: 65,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 10
    
  },
  cancelSaveText:{
    fontSize: 20,

  },
  addClientTextInput:{
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft: 0,
    paddingRight: 0, 
    backgroundColor: 'transparent',
    color:'white',
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: 'white',
    width: 300,
  //  margin: 20,
   marginTop: 75
  
  },
  editClientTextInput:{
    fontSize: 18,
    paddingTop: 5,
    paddingBottom:5,
    paddingLeft: 0,
    paddingRight: 0, 
    color:'black',
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    opacity: .6,
    borderBottomColor: 'black',
    width: '50%',
    margin: 5,
    paddingLeft: 5, 
    },
  listContainer:{
    flex:1,
    // marginTop:10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 50,
  },
  eachItemContainer:{
      flexDirection:'row',
      alignItems: 'center',
        backgroundColor: 'rgba(241, 254, 255, 1)',
        justifyContent: "flex-start",
        height: 75,
        // marginBottom: 25,
        paddingLeft:15,
        shadowColor: "#000",
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        
  },
  listText:{
    fontSize: 22,
    textTransform: "capitalize",
    marginRight:25,
    padding:15,

  },
  deleteBtnContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
        color: 'white',
        flex: 1,
        // marginBottom:25,
        width: "100%",

        
  },
  delete: {
    width:75, 
    backgroundColor: 'red', 
    textAlign:'center', 
    height: 75,
    justifyContent:'center',
    alignItems: 'center',

  },
  editName:{
    width:75, 
    backgroundColor: 'gray', 
    textAlign:'center', 
    height: 75,
   
    justifyContent:'center',
    alignItems: 'center',
  },
  editNameText:{
    color: 'white',
    fontSize:18,
    textAlign: 'center'
  },
})