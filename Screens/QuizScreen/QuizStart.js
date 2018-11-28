import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation'

export default class QuizStart extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
  
        };
    }

getQuiz(){
    
    const { category, difficulty } = this.props.navigation.state.params.quizParams;
    console.log(this.props.navigation.state.params.quizParams)
    
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {  
                console.log("quiz result", result)
                // this.setState({
                //     searchLocations
                // })
            })
}


componentDidMount(){
    this.getQuiz();
}

    render() {
        // console.log(this.props.navigation.state.params.quizParams)
        return (
            <View style={{ flex: 1 }}>
                <Text>QuizStart</Text>
            </View>
        );
    }
}