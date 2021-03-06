import React, { Component } from 'react';

import CatalogList from './CatalogList';
import {
    ScrollView,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableHighlight,
    Switch,
    NativeModules,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var PangPangBridge = NativeModules.PangPangBridge;

const navigatorTitle = "Setting";
class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settingData: null,
            allowAlipay: false,
            allowCash: true,
            allowWxpay: false,
            allowOffline: false,
        }
        this.settings = this.settings.bind(this);
    }

    componentWillMount() {
        this.settings();
    }

    componentDidMount() {
    }
    settings() {
        PangPangBridge.callAPI("/context/settings", null).then((data) => {
            var rs = JSON.parse(data);
            console.log(rs.result);
            this.setState({ settingData: rs.result });
            this.setState({ allowAlipay: Boolean(rs.result.payment.allowAlipay) });
            this.setState({ allowCash: Boolean(rs.result.payment.allowCash) });
            this.setState({ allowWxpay: Boolean(rs.result.payment.allowWxpay) });
            this.setState({ allowOffline: Boolean(rs.result.payment.allowOffline) });
        });
    }
    _pressMenuButton() {
        this.props.toggle();
    }
    _switchOnchange(value, type) {
        // console.log(value);
        // console.log(type);
        switch (type) {
            case "alipay":
                this.setState({ allowAlipay: value });
                break;
            case "cash":
                this.setState({ allowCash: value });
                break;
            case "wxpay":
                this.setState({ allowWxpay: value });
                break;
            case "offline":
                this.setState({ allowOffline: value });
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f0f0', height: Dimensions.get('window').height }}>
                <View style={styles.navigatorBar} >
                    <TouchableOpacity onPress={this._pressMenuButton.bind(this)} style={styles.backBtn}>
                        <Icon name="bars" style={styles.backBtnImg} ></Icon>
                    </TouchableOpacity>
                    <View style={styles.navigatorTitle}>
                        <Text style={styles.navigatorTitleText}>{navigatorTitle}</Text>
                    </View>
                    <View style={styles.rightBtn}>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.group}>
                        <View style={styles.groupTile}>
                            <Text >payment</Text>
                        </View>
                        <View style={styles.groupContent}>
                            <View style={styles.groupitem}>
                                <Text>allowAlipay</Text>
                                <Text>{this.state.settingData ? this.state.settingData.payment.alloAlipay.toString() : ""}</Text>
                                <Switch
                                    value={this.state.allowAlipay}
                                    onValueChange={(value) => { this._switchOnchange(value, "alipay") }}

                                />
                            </View>

                            <View style={styles.groupLine}></View>
                            <View style={styles.groupitem}>
                                <Text>allowCash</Text>
                                <Text>{this.state.settingData ? this.state.settingData.payment.alloCash.toString() : ""} </Text>
                                <Switch
                                    value={this.state.allowCash}
                                    onValueChange={(value) => { this._switchOnchange(value, "cash") }}

                                />
                            </View>

                            <View style={styles.groupLine}></View>
                            <View style={styles.groupitem}>
                                <Text>allowWxpay</Text>
                                <Text>{this.state.settingData ? this.state.settingData.payment.alloWxpay.toString() : ""} </Text>
                                <Switch
                                    value={this.state.allowWxpay}
                                    onValueChange={(value) => { this._switchOnchange(value, "wxpay") }}

                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.groupTile}>
                            <Text >price</Text>
                        </View>
                        <View style={styles.groupContent}>
                            <View style={styles.groupitem}>
                                <Text>currency</Text>
                                <Text>{this.state.settingData ? this.state.settingData.price.currency.toString() : ""}</Text>
                            </View>

                            <View style={styles.groupLine}></View>
                            <View style={styles.groupitem}>
                                <Text>roundDigit</Text>
                                <Text>{this.state.settingData ? this.state.settingData.price.roundDigit.toString() : ""} </Text>
                            </View>

                            <View style={styles.groupLine}></View>
                            <View style={styles.groupitem}>
                                <Text>roundStrategy</Text>
                                <Text>{this.state.settingData ? this.state.settingData.price.roundStrategy.toString() : ""} </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.group}>
                        <View style={styles.groupTile}>
                            <Text >system</Text>
                        </View>
                        <View style={styles.groupContent}>
                            <View style={styles.groupitem}>
                                <Text>allowOffline</Text>
                                <Text>{this.state.settingData ? this.state.settingData.system.allowOffline.toString() : ""}</Text>
                                <Switch
                                    value={this.state.allowOffline}
                                    onValueChange={(value) => { this._switchOnchange(value, "offline") }}
                                />
                            </View>

                            <View style={styles.groupLine}></View>
                            <View style={styles.groupitem}>
                                <Text>traceInterval</Text>
                                <Text>{this.state.settingData ? this.state.settingData.system.traceInterval.toString() : ""} </Text>
                            </View>
                        </View>
                    </View>


                </ScrollView>
            </View>
        );
    }
}

let styles;

if (Platform.OS === 'ios') {
    styles = StyleSheet.create({
        navigatorBar: {
            backgroundColor: "#3e9ce9",
            height: 64,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        backBtn: {
            marginTop: 20,
            height: 40,
            width: 50,
            justifyContent: 'center',
        },
        backBtnImg: {
            fontSize: 25,
            textAlign: 'center',
            color: 'white',
        },
        navigatorTitle: {
            // backgroundColor:'red',
            marginTop: 20,
            height: 40,
            width: 150,
            justifyContent: 'center',
        },
        navigatorTitleText: {
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
        },
        rightBtn: {
            // backgroundColor:'green',
            marginTop: 20,
            height: 40,
            width: 50,
            justifyContent: 'center',
        },
        scrollView: {
            height: Dimensions.get('window').height - 64,
            // backgroundColor:'yellow',
        },
        group: {
            marginTop: 10,

        },
        groupTile: {
            margin: 5,
        },
        groupContent: {
            backgroundColor: 'white',
            paddingLeft: 10,
            paddingRight: 10,
        },
        groupLine: {
            // marginTop: 1,
            height: 0.5,
            backgroundColor: 'gray',
            width: Dimensions.get('window').width - 10,
            alignSelf: 'center',
            opacity: 0.4,
        },
        groupitem: {
            flexDirection: 'row',
            height: 30,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 5,
        },
    });
}
else if (Platform.OS === 'android') {
    styles = StyleSheet.create({
        navigatorBar: {
            backgroundColor: "#3e9ce9",
            height: 44,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        backBtn: {
            marginTop: 0,
            height: 40,
            width: 50,
            justifyContent: 'center',
        },
        backBtnImg: {
            fontSize: 25,
            textAlign: 'center',
            color: 'white',
        },
        navigatorTitle: {
            // backgroundColor:'red',
            marginTop: 0,
            height: 40,
            width: 150,
            justifyContent: 'center',
        },
        navigatorTitleText: {
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
        },
        rightBtn: {
            // backgroundColor:'green',
            marginTop: 0,
            height: 40,
            width: 50,
            justifyContent: 'center',
        },
        scrollView: {
            height: Dimensions.get('window').height - 64,
            // backgroundColor:'yellow',
        },
        group: {
            marginTop: 10,
        },
        groupTile: {
            margin: 5,
        },
        groupContent: {
            backgroundColor: 'white',
            paddingLeft: 10,
            paddingRight: 10,
        },
        groupLine: {
            // marginTop: 1,
            height: 0.5,
            backgroundColor: 'gray',
            width: Dimensions.get('window').width - 10,
            alignSelf: 'center',
            opacity: 0.4,
        },
        groupitem: {
            flexDirection: 'row',
            height: 30,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 5,
        },
    });
}
export default Setting;

