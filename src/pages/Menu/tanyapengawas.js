import { View, Text, ScrollView, TouchableOpacity, Linking, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';

export default function TanyaPengawas({ navigation }) {
    const handleWhatsAppClick = (x) => {
        const phoneNumber = x; // Nomor WhatsApp pengawas
        const url = `https://wa.me/${phoneNumber}`;
        Linking.openURL(url).catch(err => console.error("Gagal membuka WhatsApp:", err));
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(apiURL + 'pengawas').then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Tanya Pengawas" />

            <FlatList data={data} renderItem={({ item, value }) => {
                return (
                    <TouchableOpacity
                        onPress={() => handleWhatsAppClick(item.telepon)}
                        style={{
                            backgroundColor: colors.white,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: colors.border,
                            padding: 15,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* Icon Profil */}
                            <Image style={{
                                width: 80,
                                height: 79,
                                borderRadius: 100,
                            }} source={{
                                uri: webURL + item.foto_user
                            }} />

                            {/* Nama dan Nomor */}
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: colors.primary }}>
                                    {item.nama_lengkap}
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: "flex-start",
                                    alignItems: "center",

                                }}>
                                    <Icon type='ionicon' name='logo-whatsapp' size={20} color={colors.success} />
                                    <Text style={{ fontFamily: fonts.primary[600], fontSize: 14, color: colors.text, paddingHorizontal: 10, top: 4 }}>{item.telepon}</Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }} />
        </View>
    );
}