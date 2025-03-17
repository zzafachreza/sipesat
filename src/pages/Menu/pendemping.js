import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';

export default function PendampinganKomunitas({ navigation }) {
    const [pendampinganData, setPendampinganData] = useState([]);

    // Contoh data dari database (bisa diganti dengan data dari API atau state management)
    const fetchData = () => {
        const data = [
            {
                tanggal: '20 Februari 2025',
                namaKomunitas: 'Komunitas Belajar Bareng',
                waktuPendampingan: '25 Februari 2025',
                tujuanPendampingan: 'Pendampingan Komunitas',
            },
            // Tambahkan data lain jika ada
        ];
        setPendampinganData(data);
    };

    useEffect(() => {
        fetchData(); // Fetch data saat komponen dimount
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Pendampingan Komunitas Belajar" />

            <ScrollView>
                <View style={{ padding: 10 }}>

                    {/* Tombol Unduh Semua */}
                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: colors.success,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <Icon type='ionicon' name='download-outline' color={colors.white} size={25} />
                        <Text style={{ fontFamily: fonts.primary[500], color: 'white', fontSize: 15, textAlign: 'center', paddingHorizontal: 10, top: 3 }}>
                            Unduh Semua
                        </Text>
                    </TouchableOpacity>

                    {/* Render Card atau Pesan Jika Tidak Ada Data */}
                    {pendampinganData.length > 0 ? (
                        pendampinganData.map((item, index) => (
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
                                {/* Tanggal */}
                                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: '#C9C5C8', marginBottom: 10 }}>
                                    {item.tanggal}
                                </Text>

                                {/* Nama Komunitas Belajar */}
                                <View style={{ flexDirection: 'row', marginBottom: 5 ,}}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Nama Komunitas Belajar
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.namaKomunitas}
                                    </Text>
                                </View>

                                {/* Waktu Pendampingan */}
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Waktu Pendampingan
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.waktuPendampingan}
                                    </Text>
                                </View>

                                {/* Tujuan Pendampingan */}
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Tujuan Pendampingan
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.tujuanPendampingan}
                                    </Text>
                                </View>

                                {/* Tombol Selengkapnya */}
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('PedampinganDetail')}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.primary, marginRight: 5 }}>
                                        Selengkapnya
                                    </Text>
                                    <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} size={15} />
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, textAlign: 'center', marginTop: 20 }}>
                            Belum ada pendampingan komunitas belajar
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}