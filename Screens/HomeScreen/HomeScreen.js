import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
import { Container, Header, Content, Button, Text } from 'native-base';

import { StackActions, NavigationActions } from 'react-navigation'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,

            isCameraOpen: false,
            loading: true
        };
        this.handleFacesDetected = this.handleFacesDetected.bind(this)
    }

    handleFacesDetected(param) {
        console.log(param, "DETECTING FACE...");

        if (param.faces.length > 0) {
            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'QuizSelect' }),
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }

    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
        });
        this.setState({ loading: false });
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { isCameraOpen, hasCameraPermission, loading } = this.state;
        if (loading) {
            return <Expo.AppLoading />
        }

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>

                    {
                        isCameraOpen ? (
                            <Camera style={{ flex: 1 }} type={this.state.type} onFacesDetected={this.handleFacesDetected}
                                faceDetectorSettings={{
                                    mode: FaceDetector.Constants.Mode.fast,
                                    detectLandmarks: FaceDetector.Constants.Mode.none,
                                    runClassifications: FaceDetector.Constants.Mode.none,
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 0.1,
                                            alignSelf: 'flex-end',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                type: this.state.type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back,
                                            });
                                        }}>
                                        <Text
                                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                            {' '}Flip{' '}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        ) :
                            <Container>
                                <Content padder>
                                    <Button block success
                                        onPress={() => this.setState({ isCameraOpen: true })}
                                    >
                                        <Text>Detect my Face</Text>
                                    </Button>
                                </Content>
                            </Container>

                    }

                </View>
            );
        }

    }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
