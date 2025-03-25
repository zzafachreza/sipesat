import { View, Text, ScrollView, StyleSheet, Image, Alert, Pressable, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton, MyHeader } from '../../components'
import axios from 'axios';
import { apiURL, getData, MYAPP, webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
export default function MeetingDetail({ navigation, route }) {
    const item = route.params;
    console.log(item);
    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(res => setUser(res));
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Meeting Detail" />
            <ScrollView>
                <View style={{
                    margin: 10,
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

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontFamily: fonts.primary[500], marginBottom: 10, fontSize: 10, color: colors.text, width: '40%' }}>
                            Link :
                        </Text>
                        <Pressable onPress={() => Linking.openURL(item.link_meeting)}>
                            <Text style={{ textAlign: 'center', fontFamily: fonts.primary[500], fontSize: 12, color: colors.danger }}>
                                {item.link_meeting}
                            </Text>
                        </Pressable>
                    </View>


                </View>
            </ScrollView>
            {user.role == 'Pengawas Sekolah' &&
                <View style={{
                    padding: 10,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <MyButton title="Edit" onPress={() => navigation.navigate('ShowWeb', {
                            link: webURL + 'meeting/edit/' + item.id_meeting,
                            judul: 'Edit Meeting'
                        })} />
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <MyButton title="Hapus" onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            {
                                text: 'TIDAK'
                            },
                            {
                                text: 'HAPUS',
                                onPress: () => {
                                    axios.post(apiURL + 'delete_data', {
                                        modul: 'meeting',
                                        id: item.id_meeting,
                                    }).then(res => {
                                        if (res.data.status == 200) {
                                            showMessage({
                                                type: 'success',
                                                message: res.data.message
                                            });
                                            navigation.goBack();
                                        }
                                        console.log(res.data);
                                    })
                                }
                            }
                        ])} warna={colors.danger} />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({})