import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function HomePengawas({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Menu" />

            <ScrollView>
                <View style={{ padding: 10 }}>

                    {/* First Row */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 }}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("ProfileGuru")}>
                            <View>
                                <View style={{ padding: 10, width: 120, height: 120, borderRadius: 20, borderWidth: 1, borderColor: colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 64, height: 64, alignSelf: "center" }} source={require('../../assets/icon_guru.png')} />
                                </View>
                                <Text style={{ textAlign: "center", fontFamily: fonts.primary[600], color: colors.secondary, fontSize: 15, alignSelf: "center" }}>
                                Profil Kepala{'\n'}Sekolah/Guru
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate("BukuKunjugan")}>
                            <View style={{marginTop:-23}}>
                                <View style={{ padding: 10, width: 120, height: 120, borderRadius: 20, borderWidth: 1, borderColor: colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 63, height: 64, alignSelf: "center" }} source={require('../../assets/icon_buku.png')} />
                                </View>
                                <Text style={{ textAlign: "center", fontFamily: fonts.primary[600], color: colors.secondary, fontSize: 15 }}>
                                Buku Kunjungan
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* Second Row */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 }}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("PedampinganKomunitas")}>
                            <View>
                                <View style={{ padding: 10, width: 120, height: 120, borderRadius: 20, borderWidth: 1, borderColor: colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 63, height: 63, alignSelf: "center" }} source={require('../../assets/icon_pendampingan.png')} />
                                </View>
                                <Text style={{ textAlign: "center", fontFamily: fonts.primary[600], color: colors.secondary, fontSize: 15, alignSelf: "center", left:-10}}>
                                    Pendampingan{'\n'}Komunitas Belajar
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('MeetingPengawas')}>
                            <View style={{
                                marginTop:-23
                            }}>
                                <View style={{ padding: 10, width: 120, height: 120, borderRadius: 20, borderWidth: 1, borderColor: colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 64, height: 64, alignSelf: "center" }} source={require('../../assets/icon_meeting.png')} />
                                </View>
                                <Text style={{ textAlign: "center", fontFamily: fonts.primary[600], color: colors.secondary, fontSize: 15 }}>
                                    Meeting
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* Third Row */}
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: 10, marginLeft:15 }}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate("Pengumuman")}>
                            <View>
                                <View style={{ padding: 10, width: 120, height: 120, borderRadius: 20, borderWidth: 1, borderColor: colors.secondary, justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 63, height: 63, alignSelf: "center" }} source={require('../../assets/icon_pengumuman.png')} />
                                </View>
                                <Text style={{ textAlign: "center", fontFamily: fonts.primary[600], color: colors.secondary, fontSize: 15, alignSelf: "center" }}>
                                    Pengumuman
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}