import HomeScreen from  '../Screens/HomeScreen/HomeScreen'
import QuizSelect from  '../Screens/QuizScreen/QuizSelect'
import QuizStart from  '../Screens/QuizScreen/QuizStart'
import QuizResult from  '../Screens/QuizScreen/QuizResult' 

import { createStackNavigator, createAppContainer } from "react-navigation";

const StackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    QuizSelect: {
        screen: QuizSelect
    },
    QuizStart: {
        screen: QuizStart
    },
    QuizResult: {
        screen: QuizResult
    },
})
  
const Navigator = createAppContainer(StackNavigator)

export default Navigator