import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts, windowWidth } from '../../utils';
import { MyHeader } from '../../components';
import { getData } from '../../utils/localStorage';

export default function HomePengawas({ navigation }) {

    const MyMenu = ({ img, label, onPress }) => {
        return (
            <Pressable onPress={onPress}>
                <View>
                    <View style={{
                        width: windowWidth / 3,
                        height: 120, borderRadius: 20, borderWidth: 1,
                        borderColor: colors.secondary,
                        justifyContent: "center", alignItems: "center"
                    }}>
                        <Image style={{
                            width: 70, height: 70,
                            alignSelf: "center"
                        }} source={img} />
                    </View>
                    <Text style={{
                        marginTop: 10,
                        textAlign: "center",
                        fontFamily: fonts.secondary[600],
                        color: colors.secondary,
                        fontSize: 12,

                    }}>
                        {label}
                    </Text>
                </View>
            </Pressable>
        )
    }
    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(res => {
            setUser(res);
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Menu" />

            <ScrollView>
                <View style={{ padding: 10 }}>

                    {/* First Row */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 }}>
                        <MyMenu label={`Profil Kepala${'\n'}Sekolah/Guru`} img={require('../../assets/icon_guru.png')} onPress={() => navigation.navigate('ProfileGuru', user)} />
                        <MyMenu label={`Buku Kunjungan`} img={require('../../assets/icon_buku.png')} onPress={() => navigation.navigate('BukuKunjugan', user)} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 }}>

                        <MyMenu label={`Pendampingan${'\n'}Komunitas Belajar`} img={require('../../assets/icon_pendampingan.png')} onPress={() => navigation.navigate('PedampinganKomunitas', user)} />
                        <MyMenu label={`Agenda${'\n'}Pengawas`} img={require('../../assets/icon_agenda.png')} onPress={() => navigation.navigate('AgendaPengawas', user)} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 }}>

                        <MyMenu label={`Meeting`} img={require('../../assets/icon_meeting.png')} onPress={() => navigation.navigate('Meeting', user)} />

                        <MyMenu label={`Pengumuman`} img={require('../../assets/icon_pengumuman.png')} onPress={() => navigation.navigate('Pengumuman', user)} />
                    </View>



                </View>
            </ScrollView>
        </View>
    );
}