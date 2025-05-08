import { View, Text, ScrollView, TextInput, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Color, colors, fonts } from '../../utils'
import { Dokumentasi, MyCalendar, MyHeader, MyInput } from '../../components'

export default function TambahBukuKunjungan({ navigation }) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Tambah Buku Kunjungan" />

            <ScrollView>
                <View style={{
                    padding: 10,
                }}>

                    <MyInput label="Nama Satuan Pendidikan" />
                    <MyCalendar label="Waktu Kunjungan" />
                    <MyInput label="Tujuan Kunjungan" />
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
                                height: 100,
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                textAlignVertical: 'top', // Agar teks dimulai dari atas
                            }}
                            multiline={true} // Memungkinkan input multi-baris
                            placeholder="Belum ada catatan"
                            placeholderTextColor={Color.blueGray[300]}
                        />
                    </View>

                    <View>
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, left: 15, color: colors.primary, marginTop: 10 }}>
                            Dokumentasi
                        </Text>
                        <Dokumentasi />
                    </View>

                    <TouchableNativeFeedback>
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.success,
                            borderRadius: 20,
                            marginTop: 20

                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                textAlign: "center",
                                color: colors.white,
                            }}>Simpan</Text>

                        </View>
                    </TouchableNativeFeedback>

                </View>
            </ScrollView>
        </View>
    )
}