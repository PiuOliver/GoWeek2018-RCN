//import liraries
import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
// create a component
class New extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        NewTweet: "",
    };

    goBack = () => {
        this.props.navigation.pop();
    }
    handleNewTweet = async() => {
        const content = this.state.NewTweet;
        const author = await AsyncStorage.getItem("@GoTwitter:username");
        await api.post('tweets', {content, author});
        this.goBack();
    }

    handleInputChange = NewTweet => {
        this.setState({NewTweet});
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Icon name="close" size={24} color="#4BB0EE"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
                        <Text style={styles.buttonText}>Tweetar</Text>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    style={styles.input} 
                    placeholder="O que está acontencendo?" 
                    multiline 
                    value={this.state.NewTweet} 
                    onChangeText={this.handleInputChange} 
                    placeholderTextColor="#999"
                    returnKeyType="send"
                    onSubmitEditing={this.handleNewTweet}/>
            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  

//make this component available to the app
export default New;