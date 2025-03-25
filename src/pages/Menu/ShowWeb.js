import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton, MyHeader } from '../../components'
import axios from 'axios';
import { apiURL, MYAPP, webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import { showMessage } from 'react-native-flash-message';
export default function ShowWeb({ navigation, route }) {
    const item = route.params;
    console.log(item)
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title={!item.judul ? 'Lihat Web / Video' : item.judul} />
            <View style={{
                flex: 1,
            }}>
                <WebView
                    onMessage={(event) => {
                        if (event.nativeEvent.data === 'success') {
                            showMessage({
                                type: 'success',
                                message: 'Data berhasil disimpan !',
                            });
                            navigation.goBack()
                        } else if (event.nativeEvent.data === 'success_edit') {
                            showMessage({
                                type: 'success',
                                message: 'Data berhasil diedit !',
                            });
                            navigation.pop(2)
                        }
                    }}
                    source={{
                        uri: item.link
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})