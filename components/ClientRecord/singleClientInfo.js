import React, { Component } from "react";
import { View, Modal, TouchableHighlight,TouchableOpacity,  Alert, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Text, Textarea, Form, Button } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import { set } from "react-native-reanimated";

import DatePicker from 'react-native-date-picker';

export default class singleClientInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientInfo: [this.props.route.params.params],
      chosenDate: new Date(),
      modalVisible: false,
      addingVisitInfo: '',
      addingRetailInfo: '',
      infoDetails: [],
      storageKey: '',
      targetItem: '',
      categoryList: []

    };/*  */
    this.setDate = this.setDate.bind(this);
    this.deleteClientInfo = this.deleteClientInfo.bind(this)

  }

  componentDidMount() {
    // console.log(this.state.clientInfo)
    // console.log(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}`)
    
    this.getClientInfo(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}`)
      .then(infoDetails => {

        if (infoDetails) {
          this.setState({
            infoDetails: JSON.parse(infoDetails)
          })
        }
      }
      );
    this.getAllKeys()


  }

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch (e) {
      // read key error
    }

    // console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']

// this.clearItem('undefinedundefined')

  }



  setDate(newDate) {
    
    this.setState({ chosenDate: newDate });

  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  async updateSingleClient(singleClientInfo) {
    try {

      await AsyncStorage.removeItem(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}`);
      await AsyncStorage.setItem(`${this.state.clientInfo[0].key}${this.state.clientInfo[0].name}`, JSON.stringify(singleClientInfo));
      return singleClientInfo;
    } catch (error) {
      alert(error)
      }

  };


  clearItem = async (key) => {
    await AsyncStorage.removeItem(key);

    this.setState({ infoDetails: [] });
  };


  getClientInfo = async (key) => {
    try {
      const infoDetails = await AsyncStorage.getItem(key)
      // value previously stored
      if (infoDetails !== null) {
        return infoDetails
      } else {
        return
      }
    } catch (e) {
      // error reading value
      alert(e);
    }
  }

  deleteClientInfo(key) {
    let infoDetails = [...this.state.infoDetails];
    const prevIndex = infoDetails.findIndex(item => item.key === key);
    
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete these notes?',
      [
        {text: 'Cancel', onPress: () => {return}, style: 'cancel'},
        {text: 'DELETE!', onPress: () => {infoDetails.splice(prevIndex, 1),
          this.updateSingleClient(infoDetails),
          this.setState({infoDetails: infoDetails})
          
        }}
      ],
      { cancelable: false }
    )
    
  }
  
  addDetails() {
   
    if (this.state.chosenDate === "" || this.state.addingVisitInfo === "") {
      alert("Please fill in entries!")
    } else {

      let infoDetails = [...this.state.infoDetails];
      infoDetails.push({
        title: this.state.chosenDate.toString().substr(4, 12),
        notes: this.state.addingVisitInfo,
        retail: this.state.addingRetailInfo,
        editMode: false,
       
      });
      this.updateSingleClient(infoDetails)

      this.setState({
        infoDetails: infoDetails,
        addingVisitInfo: '',
        addingRetailInfo: ''
      })

      this.setModalVisible(!this.state.modalVisible)
    }
  }
  findEditIndex(targetItem){
    this.state.infoDetails.map((item) => {
      if(item.key === targetItem){
        item.editMode = !item.editMode
        this.setState({
          targetItem: ''
        })
      }
    })
  }
  saveEditClient(targetItem){ 
    this.state.infoDetails.map((item) => {
      if(item.key === targetItem){
        item.notes = this.state.addingVisitInfo
        item.retail = this.state.addingRetailInfo
        this.updateSingleClient(this.state.infoDetails);
        this.setState({
          
          addingVisitInfo: "",
          addingRetailInfo: ''
        })
      
      }
    })
}

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 20,
        marginBottom:1,
        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 14,
        
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,0,0,.1)',
        backgroundColor:'white',
       
        
        
        
      }}>
        <Text style={{  fontSize: 22 }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 20 }} name="up" />
          
          : <Icon style={{ fontSize: 20 }} name="down" />
          
        }
      </View>
    );
  }




  _renderContent(item) {
    // let this.state.infoDetails = this.state.infoDetails.reverse()
    this.state.infoDetails.map((item, index) => {
      item.key = index
  })
    if (item.editMode === false){
    return (
      <View style={styles.contentContainer} key={item.key}>
        <View style={styles.accordionContentView}>
            <Text style={{
                padding: 10,
                fontStyle: "italic",
                fontSize: 25,
                borderBottomWidth: 2,
                fontWeight: "bold"
              }}>
              Notes
            </Text>
        </View>
        
        <Text
          style={styles.accordionNotes}
        >
          {item.notes}
          
          </Text>
          <View style={styles.accordionContentView}>
            <Text style={{
              padding: 10,
              fontStyle: "italic",
              fontSize: 25,
              fontWeight: "bold"
            }}>
            Retail
          </Text>
        </View>
       
                <Text style={styles.accordionNotes}>
                {item.retail}
                </Text>


        <View style={{
          justifyContent: 'center',
          alignContent: 'center', alignItems: 'center'
        }}>
          <TouchableOpacity 
                style= {styles.editNotesBtn}
                onPress = {()=>{
                  this.setState({
                    addingVisitInfo: item.notes,
                    addingRetailInfo: item.retail
                  })
                  this.findEditIndex(item.key)
                }
                }
                >
                  <Text style={styles.editNotesText}>Edit Notes</Text>
                </TouchableOpacity>
          <TouchableHighlight style={styles.deleteNotesBtn}
          onPress ={()=> this.deleteClientInfo(item.key)}
          >
            <Text style={styles.deleteNotesText}>DELETE</Text>
            {/* <Icon name='trash' style={{fontSize: 25, color: 'red'}}/> */}
          </TouchableHighlight>
        </View>
      </View>
              
    )}else if(item.editMode ===true){
      return (
        <View style={{ padding: 10, 
                      backgroundColor: 'white', 
                      marginLeft:0,
                      marginRight: 0,
                      marginTop: -23,
                      
                    }}
        >
        <View>
          <Text >Notes</Text>
        </View>
        <Form>
          <Textarea rowSpan={5} bordered placeholder=""
            onChangeText={(addingVisitInfo) => this.setState({ addingVisitInfo })}
            value={this.state.addingVisitInfo}
          />
        </Form>
        <View>
          <Text>Retail</Text>
        </View>
        <Form>
          <Textarea rowSpan={5} bordered placeholder=""
            onChangeText={(addingRetailInfo) => this.setState({ addingRetailInfo })}
            value={this.state.addingRetailInfo}
          />
        </Form>
        <TouchableOpacity 
        style={styles.cancelSave}
        onPress = {()=> {
          this.saveEditClient(item.key);
          this.findEditIndex(item.key)
        }}>
              <Text 
              style={styles.cancelSaveText}>Save</Text>
              
            </TouchableOpacity>
  
            <TouchableOpacity 
            style={styles.cancelSave}
            onPress = {()=> {
              this.findEditIndex(item.key)
            }}>
              <Text style={styles.cancelSaveText}>Cancel</Text>
              
            </TouchableOpacity>
        </View>

      )
    }
  }

  
renderAccordion(item) {
  return(
    <Accordion 

    dataArray={item} icon="add" 
            expanded={true}
            style={{borderBottomWidth:0, borderTopWidth: 0, borderLeftWidth:0,borderRightWidth:0, paddingTop:20}}
            expandedIcon="remove"
              renderContent={this._renderContent.bind(this)}
              renderHeader={this._renderHeader.bind(this)}
              
            />
  )
}

  

  render() {

    
    let eachDaysInfo = this.state.infoDetails.slice(0).reverse().map((item) =>{
      if(item){
        return item
      }else{
        return null
      }
    }
  )
  
   
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(229, 240, 255, .1)"}}>
        <View style={styles.headerWithBtn}>
          <Text style={{fontSize: 20, fontFamily: 'helveticaneue-lightitalic'}}> Log appointment info </Text>
          <TouchableHighlight style={styles.button}
            onPress={() => {
              this.setModalVisible(true);
            }}>
              {/* <Text style={{ color: 'gray', padding: 0,fontSize:25, width: "100%", textAlign: 'center', marginTop:0}}>+</Text> */}
            <Icon name='pluscircleo' size ={35} style={{ color: 'gray' , width: '100%', textAlign:'center'}} />
          </TouchableHighlight>
        </View>
      

        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={50} style={{flex:1}}>
        
            <View style={{flex:1,marginTop: 0, marginLeft:5, marginRight: 5}}>
          
          
            {this.renderAccordion(eachDaysInfo)}

        </View> 
        </KeyboardAvoidingView>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Container>
            <Content padder>
              <Card>
                <CardItem Header style={{ justifyContent:'center', alignContent:'center'}}>
                  <Text style ={{fontSize: 20,textAlign:'center', width:250, fontFamily:'baskerville'}}>
                    Add visit notes
                    </Text>
                </CardItem>
                <CardItem >
                  

            <DatePicker
            date= {this.state.chosenDate}
                  mode= {'date'}
                  onDateChange={this.setDate}
                />


                </CardItem>
                <CardItem bordered>
                  <Text>
                    {this.state.chosenDate.toString().substr(4, 12)}
                  </Text>
                </CardItem>
                <View style={{ padding: 10 }}>

                  {/* <CardItem>
                    {category}
                  </CardItem> */}
                  <View>
                    <Text>Notes</Text>
                  </View>
                  <Form>
                    <Textarea rowSpan={5} bordered placeholder=""
                      onChangeText={(addingVisitInfo) => this.setState({ addingVisitInfo })}
                      value={this.state.addingVisitInfo}
                    />
                  </Form>
                  <View>
                    <Text>Retail</Text>
                  </View>
                  <Form>
                    <Textarea rowSpan={5} bordered placeholder=""
                      onChangeText={(addingRetailInfo) => this.setState({ addingRetailInfo })}
                      value={this.state.addingRetailInfo}
                    />
                  </Form>



                  <CardItem bordered>
                  </CardItem>
                  <Button iconLeft
                    style={{ width: 150, justifyContent:'space-around', alignItems: 'center' }}
                    onPress={this.addDetails.bind(this)}
                    // onPressOut={() => {
                    //   this.setModalVisible(!this.state.modalVisible);
                    // }}
                  >
                   
                    <Icon name='plus' size= {22} style ={{color: 'white', marginLeft:10}} />
                    <Text style ={{fontSize: 18}}>Complete</Text>
                  </Button>

                </View>
              </Card>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,

              }}>
                <TouchableHighlight style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  padding: 10,
                  width: 75,
                  height: 75,
                  margin: 'auto',
                  borderRadius: 50
                }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>

                  <Icon name='close' size={28} style={{ color: 'white', }} />
                </TouchableHighlight>
              </View>
            </Content>
          </Container>
        </Modal>
       
      </View>
      
    );
  }
}



const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    padding: 0,
    margin:0,

  },
  addBtnText:{ 
    color: 'gray', 
    padding: 0,
    fontSize:25, 
    width: "100%", 
    textAlign: 'center', 
    marginTop:0
},
  headerWithBtn:{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 4,
      // position: "relative",
      zIndex: 15,
      backgroundColor: 'white',
      height: 75,
      paddingLeft: 25,
      paddingRight: 25,
      width: '100%',
      
  },
  accordionContentView:{
    borderBottomWidth: 1, 
    borderBottomColor: 'lightgray',
    width: '75%',
    marginTop: 20,
  },
  accordionNotes:{
    padding: 10,
    maxWidth: 500, 
    fontSize: 18,
 
    
  },
  contentContainer:{
    flex: 1, 
    marginTop: -5,
    marginBottom:20,  
    justifyContent: 'center', 
    alignItems:'center', 
    backgroundColor: 'white'
    
  },
  cancelSave:{
    margin: 15,
    backgroundColor: "#7c7c7c",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    width: 150,
    justifyContent:'center',
    alignItems:'center',
    

  },
  cancelSaveText:{
    fontSize: 18,
    color:"white",
    fontWeight: '900'
  },
  deleteNotesBtn:{
    backgroundColor: 'red',
    width: 300,
    justifyContent: 'center',   
    alignContent: 'center', 
    alignItems: 'center',
    margin:15, 
    borderRadius: 5,
  },
  deleteNotesText:{
    fontSize: 18, 
  
    color:'white', 
    
    fontWeight: 'bold', 
    paddingLeft:25, 
    paddingRight: 25, 
    paddingTop: 7, 
    paddingBottom: 7, 
    textAlign:'center'
  },
  editNotesBtn:{
    justifyContent: 'center', 
    borderRadius: 5,
    marginTop: 50,
    backgroundColor: 'gray',
    width:300
  },
  editNotesText:{
    fontSize: 18,
    color:'white',
    paddingLeft:25, 
    paddingRight: 25, 
    paddingTop: 7, 
    paddingBottom: 7, 
    textAlign:"center",
    fontWeight: 'bold'
  }
})