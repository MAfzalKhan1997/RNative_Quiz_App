import HomeScreen from  '../Screens/HomeScreen/HomeScreen'
import QuizScreen from  '../Screens/QuizScreen/QuizScreen'
import ResultScreen from  '../Screens/ResultScreen/ResultScreen'

import { createStackNavigator, createAppContainer } from "react-navigation";

const StackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Quiz: {
        screen: QuizScreen
    },
    Result: {
        screen: ResultScreen
    },
})
  
const Navigator = createAppContainer(StackNavigator)

export default Navigator