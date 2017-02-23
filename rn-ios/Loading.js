import React, { Component } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Platform,
    ActivityIndicator
} from 'react-native';

class Loading extends React.Component {

    state = {
        isShow: false,
    }
    static propTypes = {
        isShow:React.PropTypes.bool.isRequired,
    }
    render() {
        if (this.props.isShow) {
            return (
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingContent}>
                        <View style={styles.spinnerContainer}>
                            <ActivityIndicator
                                animating={true}
                                size='large'
                                color="#fff"
                            />
                            <Text style={styles.loadingText}>loading...</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (<View />)
        }
    }
}

let styles;

styles = StyleSheet.create({

    loadingContainer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContent: {
        width: 100,
        height: 100,
        // padding: 12,
        backgroundColor: '#000',
        borderRadius: 8,
        opacity: .8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
});

module.exports = Loading
