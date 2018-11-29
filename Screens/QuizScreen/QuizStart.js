import React from 'react';
// import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Spinner, Button } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation'

export default class QuizStart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionsArr: null,
            questNo: 0,
        };
    }

    async getQuiz() {

        const { category, difficulty } = this.props.navigation.state.params.quizParams;
        console.log(this.props.navigation.state.params.quizParams)

        await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {
                // console.log("quiz result", result.results)
                this.setState({
                    questionsArr: result.results
                })
            })
    }


    componentDidMount() {
        this.getQuiz();
    }


    nextQuest(){
        let { questNo } = this.state;

        this.setState({
            questNo: questNo++,
        })
    }

    render() {
        console.log('questions', this.state.questionsArr)
        const { questNo, questionsArr } = this.state;
        if (!questionsArr) {
            return <Container>
                <Content>
                    <Spinner color='green' />
                </Content>
            </Container>
        }
        else
            return (
                <Container>
                    <Content padder>
                        <Text>{questNo+1+') '+questionsArr[questNo].question}</Text>
                        <ListItem selected={false} >
                            <Left>
                                <Text>Lunch Break</Text>
                            </Left>
                            <Right>
                                <Radio
                                    color={"#f0ad4e"}
                                    selectedColor={"#5cb85c"}
                                    selected={false}
                                />
                            </Right>
                        </ListItem>
                        <ListItem selected={true}>
                            <Left>
                                <Text>Discussion with Client</Text>
                            </Left>
                            <Right>
                                <Radio
                                    color={"#f0ad4e"}
                                    selectedColor={"#5cb85c"}
                                    selected={true}
                                />
                            </Right>
                        </ListItem>

                        <Button block info
                        onPress={() => this.nextQuest()}
                        >
                        <Text>Next</Text>
                    </Button>
                    </Content>
                </Container>
            );
    }
}