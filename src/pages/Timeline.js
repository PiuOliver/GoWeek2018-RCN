//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
// create a component
class Timeline extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Início",
        headerRight: ( 
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon name="add-circle-outline" style={{ marginRight: 20}} size={24} color="#4BB0EE"/> 
            </TouchableOpacity>
        )
    })
    
    state = {
        tweets: [],
    };
    async componentDidMount(){
        this.subscribeToEvent();
        const response = await api.get('tweets');
        this.setState({tweets: response.data});
    }
    subscribeToEvent = () => {
        const io = socket('http://localhost:3000');
        io.on('tweet', data => {
            this.setState({tweets: [data, ...this.state.tweets]})
        });
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(
                    tweet => (tweet._id === data._id ? data : tweet)
                )})
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.tweets} 
                    keyExtractor={tweet => tweet._id} 
                    renderItem={({item}) => <Tweet tweet={item}/>}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });
  

//make this component available to the app
export default Timeline;
