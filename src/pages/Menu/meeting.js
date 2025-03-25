import { View, Text, ScrollView, TouchableNativeFeedback, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowWidth } from '../../utils'
import { MyHeader } from '../../components'
import { Icon } from 'react-native-elements'
import { apiURL, webURL } from '../../utils/localStorage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'

export default function Meeting({ navigation, route }) {
    const user = route.params;

    const [data, setData] = useState([]);
    const __getDataBaseAPI = () => {
        axios.post(apiURL + 'meeting').then(res => {

            setData(res.data);
        })
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getDataBaseAPI();
        }

    }, [isFocused]);


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Meeting" />
            <View style={{
                flex: 1,
                padding: 10,
            }}>

                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => navigation.navigate('MeetingDetail', item)}>
                            <View key={index} style={{
                                padding: 15,
                                backgroundColor: colors.white,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.border,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3,
                                marginBottom: 20,
                            }}>

                                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: '#C9C5C8', marginBottom: 10 }}>
                                    {moment(item.tanggal_buat).format('DD MMMM YYYY')}
                                </Text>

                                <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Judul Meeting
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.judul}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Tanggal Meeting
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {moment(item.tanggal).format('dddd,DD MMMM YYYY')}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Waktu Meeting
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.jam.toString().substr(0, 5)} WIB
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Link
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.link_meeting}
                                    </Text>
                                </View>


                            </View>
                        </Pressable>
                    )
                }} />

            </View>
            <View>
                {user.role == 'Pengawas Sekolah' &&
                    <Pressable onPress={() => navigation.navigate('ShowWeb', {
                        link: webURL + 'meeting/add',
                        judul: 'Tambah Meeting'
                    })}>
                        <View style={{
                            alignSelf: 'flex-end',
                            margin: 20,
                            width: 60,
                            height: 60,
                            backgroundColor: colors.primary,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon type='ionicon' name='add' color={colors.white} />
                        </View>
                    </Pressable>
                }
            </View>
        </View>
    )
}