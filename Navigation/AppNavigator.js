import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import QuizSelect from '../Screens/QuizScreen/QuizSelect'
import QuizStart from '../Screens/QuizScreen/QuizStart'
import QuizResult from '../Screens/QuizScreen/QuizResult'

import { createStackNavigator, createAppContainer } from "react-navigation";

const StackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            header: null,
            // title: 'Home',
            // headerStyle: {
            //     backgroundColor: '#3f51b5',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
        })
    },
    QuizSelect: {
        screen: QuizSelect,
        navigationOptions: () => ({
            title: 'Select',
            headerStyle: {
                backgroundColor: '#3f51b5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    QuizStart: {
        screen: QuizStart,
        navigationOptions: () => ({
            title: 'Quiz',
            headerStyle: {
                backgroundColor: '#3f51b5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    QuizResult: {
        screen: QuizResult,
        navigationOptions: () => ({
            title: 'Result',
            headerStyle: {
                backgroundColor: '#3f51b5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
})

const Navigator = createAppContainer(StackNavigator)

export default Navigator