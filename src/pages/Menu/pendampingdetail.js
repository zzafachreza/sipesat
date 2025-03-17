import { View, Text, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native';
import React from 'react';
import { MyCalendar, MyHeader, MyInput } from '../../components';
import { colors, fonts, Color } from '../../utils';
import { Icon } from 'react-native-elements';

export default function PedampinganDetail({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Pendampingan Komunitas Belajar" />

            <ScrollView>
                <View style={{ padding: 10 }}>

                    {/* Input Nama Komunitas Belajar */}
                    <MyInput label="Nama Komunitas Belajar" colorlabel={colors.primary} />

                    {/* Input Waktu Pendampingan */}
                    <MyCalendar label="Waktu Pendampingan" />

                    {/* Input Tujuan Pendampingan */}
                    <MyInput label="Tujuan Pendampingan" colorlabel={colors.primary} />

                    {/* Input Catatan */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, left: 15, color: colors.primary, marginBottom: 10 }}>
                            Catatan
                        </Text>
                        <TextInput
                            style={{
                                fontFamily: fonts.primary[600],
                                color: 'black',
                                fontSize: 12,
                                borderWidth: 1,
                                borderRadius: 20,
                                borderColor: Color.blueGray[300],
                                height: 250,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                textAlignVertical: 'top', // Agar teks dimulai dari atas
                            }}
                            multiline={true} // Memungkinkan input multi-baris
                            placeholder="Belum ada catatan"
                            placeholderTextColor={Color.blueGray[300]}
                        />
                    </View>

                    {/* Dokumentasi */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, left: 15, color: colors.primary }}>
                            Dokumentasi
                        </Text>
                    </View>

                    {/* Tombol Unduh PDF */}
                    <TouchableNativeFeedback>
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.danger,
                            borderRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                            <Icon type='ionicon' name='download-outline' size={20} color={colors.white} />
                            <Text style={{
                                fontFamily: fonts.primary[500],
                                color: colors.white,
                                textAlign: 'center',
                                top: 4,
                                paddingHorizontal: 10,
                            }}>
                                Unduh PDF
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </ScrollView>
        </View>
    );
}