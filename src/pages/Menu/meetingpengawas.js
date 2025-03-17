import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native';

export default function MeetingPengawas({ navigation }) {
    const [meetingData, setMeetingData] = useState([]);

    // Contoh data dari database (bisa diganti dengan data dari API atau state management)
    const fetchData = () => {
        const data = [
            {
                tanggal_publish: '20 Februari 2025',
                judul: 'Zoom Meeting - Rapat Awal',
                tanggal: '26 Februari 2025',
                waktu: '13:00',
                link: ' zoom.com/76ehjht723ufhf4ytg734t...',
            },
            // Tambahkan data lain jika ada
        ];
        setMeetingData(data);
    };

    useEffect(() => {
        fetchData(); // Fetch data saat komponen dimount
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Meeting" />

            <ScrollView>
                <View style={{ padding: 10 }}>

                   

                    {/* Render Card atau Pesan Jika Tidak Ada Data */}
                    {meetingData.length > 0 ? (
                        meetingData.map((item, index) => (
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
                                    {item.tanggal_publish}
                                </Text>

                                <View style={{ flexDirection: 'row', marginBottom: 5 ,}}>
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
                                        : {item.tanggal}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Waktu Meeting
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.waktu}
                                    </Text>
                                </View>

                                   <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, width: '40%' }}>
                                        Link
                                    </Text>
                                    <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.primary }}>
                                        : {item.link}
                                    </Text>
                                </View>

                               
                            </View>
                        ))
                    ) : (
                        <Text style={{ fontFamily: fonts.primary[500], fontSize: 10, color: colors.text, textAlign: 'center', marginTop: 20 }}>
                            Belum ada pendampingan komunitas belajar
                        </Text>
                    )}
                </View>
            </ScrollView>

            <View style={{
                padding:20,
                flexDirection:'row',
                justifyContent:"flex-end"
            }}>
            <TouchableNativeFeedback onPress={()=> navigation.navigate("TambahMeeting")}>
                        <View style={{
                            padding:10,
                            backgroundColor:colors.primary,
                            width:50,
                            height:50,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:100
                        }}>
            
                        <Icon type='ionicon' name='add' size={20} color={colors.white}/>
            
                        </View>
                    </TouchableNativeFeedback>
            </View>
        </View>
    );
}