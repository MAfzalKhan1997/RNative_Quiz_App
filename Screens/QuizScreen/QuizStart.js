import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Spinner, Button } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation'

export default class QuizStart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionsArr: null,
            questNo: 0,
            options: [],
            itemSelected: null,

            corrected: 0,

            sec: 0,
            min: 0,
        };
        this.quizTimer = this.quizTimer.bind(this);
        // this.timer();
    }

    async getQuiz() {
        // const { questionsArr } = this.state;
        const { category, difficulty } = this.props.navigation.state.params.quizParams;
        // console.log(this.props.navigation.state.params.quizParams)

        await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {
                // console.log("quiz result", result.results)
                this.setState({ questionsArr: result.results },
                    () => {
                        if (this.state.questionsArr.length != 0) {
                            let options = []
                            options.push(this.state.questionsArr[0].correct_answer)
                            options = [...options, ...this.state.questionsArr[0].incorrect_answers]
                            // console.log(options)
                            this.setState({ options })
                            this.timer();
                        }
                    }
                )
            })
    }


    componentDidMount() {
        this.getQuiz();
    }


    nextQuest() {
        const { questNo, questionsArr, corrected, itemSelected } = this.state;

        if (itemSelected) {

            if (questNo !== questionsArr.length - 1) {

                let options = []
                options.push(questionsArr[questNo + 1].correct_answer)
                options = [...options, ...questionsArr[questNo + 1].incorrect_answers]

                if (itemSelected === questionsArr[questNo].correct_answer) {

                    this.setState({
                        corrected: corrected + 1,
                        options,
                        questNo: questNo + 1,
                        itemSelected: null
                    })
                }
                else {
                    this.setState({
                        options,
                        questNo: questNo + 1,
                        itemSelected: null
                    })
                }
            }
            else {

                if (itemSelected === questionsArr[questNo].correct_answer) {

                    this.setState({
                        corrected: corrected + 1,
                        itemSelected: null
                    },
                        () => {
                            clearInterval(this.time);
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: 'QuizResult',
                                        params: {
                                            quizParams: {
                                                totalQuest: questionsArr.length,
                                                corrected: this.state.corrected,
                                                min: this.state.min,
                                                sec: this.state.sec,
                                            }
                                        }
                                    }),
                                ],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }
                    )
                }
                else {
                    clearInterval(this.time);
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'QuizResult',
                                params: {
                                    quizParams: {
                                        totalQuest: questionsArr.length,
                                        corrected: this.state.corrected,
                                        min: this.state.min,
                                        sec: this.state.sec,
                                    }
                                }
                            }),
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            }
        }
        else {
            alert('Selection Required')
        }
    }

    quizTimer() {
        const { sec, min } = this.state;

        if (sec === 59) {

            this.setState({
                sec: 0,
                min: min + 1,
            })
        }
        else {
            this.setState({
                sec: sec + 1,
            })
        }
    }

    timer() {
        this.time = setInterval(this.quizTimer, 1000);
    }

    render() {
        // console.log('questions', this.state.questionsArr)
        // console.log(this.state.options)
        console.log(this.state.corrected)

        const { questNo, questionsArr, options, itemSelected, min, sec } = this.state;

        if (!questionsArr) {
            return <Container style={{ top: '40%', bottom: '60%' }}>
                <Content>
                    <Spinner color='blue' />
                </Content>
            </Container>
        }
        if (questionsArr.length == 0) {
            alert('Quiz not available please select another')
            return this.props.navigation.navigate("QuizSelect")
        }
        else
            return (
                <Container>
                    <Content padder>
                        <Text style={{ flex: 1, justifyContent: "center", textAlign: "center" }}>{`${min}:${sec}`}</Text>
                        <Text style={styles.margining} >{questNo + 1 + ') ' + questionsArr[questNo].question}</Text>

                        {
                            options.map((value, index) => {
                                return <ListItem key={index} selected={itemSelected === value ? true : false} >
                                    <Left>
                                        <Text>{value}</Text>
                                    </Left>
                                    <Right>
                                        <Radio
                                            color={"#f0ad4e"}
                                            selectedColor={"#5cb85c"}

                                            onPress={() => this.setState({ itemSelected: value })}
                                            selected={itemSelected === value ? true : false}

                                        />
                                    </Right>
                                </ListItem>
                            })
                        }

                        <Button block info style={styles.btn}
                            onPress={() => this.nextQuest()}
                        >
                            <Text>Next</Text>
                        </Button>
                    </Content>
                </Container>
            );
    }
}

const styles = StyleSheet.create({
    margining: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    btn: {
        marginTop: 20,
        // marginBottom: 10,
    },
});