import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, H3, Button } from "native-base";


export default class QuizResult extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { totalQuest, corrected, min, sec } = this.props.navigation.state.params.quizParams;

        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem bordered>
                            <Body style={styles.container}>
                                <H3>Total Questions: {totalQuest}</H3>
                                <H3>Correct: {corrected}</H3>
                                <H3>Incorrect: {totalQuest - corrected}</H3>
                                <H3>Percentage: {(corrected * 100) / totalQuest} %</H3>
                                <H3>Time Taken: {`${min} min ${sec} sec`}</H3>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button block primary
                        onPress={() => this.props.navigation.navigate("QuizSelect")}
                    >
                        <Text>Play Again</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});