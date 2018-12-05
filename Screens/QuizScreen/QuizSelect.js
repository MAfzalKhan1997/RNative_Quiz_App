import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Form, Item, Picker, Text, Icon, Button } from 'native-base';

import { StackActions, NavigationActions } from 'react-navigation'

export default class QuizSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ['General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals & Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science & Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoon & Animations'],
            difficulties: ['Easy', 'Medium', 'Hard'],

            category: 0,
            difficulty: 'Easy',
        };
    }

    selectCat(value) {
        this.setState({
            category: value
        });
    }

    selectDiff(value) {
        this.setState({
            difficulty: value
        });
    }

    startQuiz() {
        let { category, difficulty } = this.state;
        category = category + 9;
        difficulty = difficulty.toLowerCase()
        console.log(category, difficulty)

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'QuizStart',
                    params: {
                        quizParams: {
                            category,
                            difficulty,
                        }
                    }
                }),
            ],
        });
        this.props.navigation.dispatch(resetAction);

    }

    render() {
        const { categories, difficulties } = this.state;
        console.log(this.state.category, '|', this.state.difficulty)
        return (
            <Container>
                <Content padder>
                    <Form style={styles.margining}>

                        <Item picker style={styles.margining}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                // style={{ width: '100%' }}
                                placeholder="Category"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.category}
                                onValueChange={this.selectCat.bind(this)}
                            >
                                {categories.map((value, index) => {
                                    return <Picker.Item label={value} value={index} key={index} />
                                })}

                            </Picker>
                        </Item>

                        <Item picker style={styles.margining}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                // style={{ width: '100%' }}
                                placeholder="Difficulty Level"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.difficulty}
                                onValueChange={this.selectDiff.bind(this)}
                            >
                                {difficulties.map((value, index) => {
                                    return <Picker.Item label={value} value={value} key={index} />
                                })}

                            </Picker>
                        </Item>
                    </Form>
                    <Button block primary style={styles.btn}
                        onPress={() => this.startQuiz()}
                    >
                        <Text>Start Quiz</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    margining: {
        marginTop: 10,
        // marginBottom: 10,
    },
    btn: {
        marginTop: 40,
        // marginBottom: 10,
    },
});
