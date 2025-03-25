import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    TouchableNativeFeedback,
    ImageBackground,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar, webURL } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
            axios.post(apiURL + 'company').then(res => {
                setCom(res.data.data)
            })
        }




    }, [isFocused]);


    const MylistPengaturan = ({ icon = 'location-outline', label, value }) => {
        return (
            <View style={{
                backgroundColor: colors.white + '99',
                // flex: 1,
                padding: 10,
                height: 70,
                borderBottomWidth: 1,
                borderBottomColor: Color.blueGray[200],
                marginVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
            }}>
                <Icon type='ionicon' name={icon} color={'#7A7A7A'} size={20} />
                <View style={{
                    paddingLeft: 10,
                }}>
                    <Text style={{
                        flex: 1,
                        left: 8,
                        ...fonts.headline5
                    }}>{label}</Text>
                    <Text style={{
                        flex: 1,
                        left: 8,
                        ...fonts.caption
                    }}>{value}</Text>
                </View>

            </View>
        )
    }


    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 0,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: Color.blueGray[50],
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        ...fonts.headline5,
                        color: colors.primary,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        ...fonts.body3,
                        color: Color.blueGray[900],
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>



            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}

            {open &&


                <ImageBackground style={{
                    flex: 1,
                }}>
                    <ScrollView>

                        <View style={{
                            paddingBottom: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300],
                            alignItems: 'center',
                            justifyContent: "center",
                            backgroundColor: colors.primary,
                            padding: 10,





                        }}>
                            <View style={{
                                width: 120,
                                height: 120,
                                borderWidth: 3,
                                borderColor: Color.blueGray[100],
                                overflow: 'hidden',
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}>

                                <Image source={{
                                    uri: webURL + user.foto_user
                                }} style={{
                                    width: 120,
                                    height: 120,

                                }} />

                            </View>





                        </View>
                        <View style={{


                            padding: 10, flex: 1, margin: 20,
                            borderRadius: 20, marginTop: 10
                        }}>

                            <MylistPengaturan label="Daftar Sebagai" icon='lock-closed-outline' value={user.role} />
                            <MylistPengaturan label="Nama Lengkap" icon='person-outline' value={user.nama_lengkap} />
                            <MylistPengaturan label="Username" icon='at' value={user.username} />
                            <MylistPengaturan label="NIP" icon='card-outline' value={user.nip} />
                            <MylistPengaturan label="Unit Kerja" icon='ribbon-outline' value={user.nip} />
                            <MylistPengaturan label="Unit Kerja" icon='ribbon-outline' value={user.nip} />
                            <MylistPengaturan label="Provinsi" icon='location-outline' value={user.provinsi} />
                            <MylistPengaturan label="Kota / Kabupaten" icon='location-outline' value={user.kota_kabupaten} />
                            <MylistPengaturan label="Kecamatan" icon='location-outline' value={user.kecamatan} />
                            <MylistPengaturan label="Kelurahan" icon='location-outline' value={user.kelurahan} />
                            <MylistPengaturan label="Telepon" icon='call-outline' value={user.telepon} />
                            <MylistPengaturan label="Email" icon='mail-outline' value={user.email} />


                            <View style={{
                                padding: 10,
                                marginTop: '10%'
                            }}>

                                <MyButton colorText={colors.white} iconColor={colors.white} warna={colors.primary} title="Edit Profile" Icons="create-outline" onPress={() => navigation.navigate('AccountEdit', user)} />
                                <MyGap jarak={10} />
                                <TouchableNativeFeedback onPress={btnKeluar}>
                                    <View style={{ padding: 10, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                        <Icon style={{ marginRight: 10, marginTop: -5 }} type='ionicon' name='log-out-outline' size={24} color={colors.danger} />
                                        <Text style={{ fontFamily: fonts.primary[600], color: colors.danger, fontSize: 15 }}>Log Out</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </ScrollView>
                    {/* data detail */}
                </ImageBackground>

            }

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
