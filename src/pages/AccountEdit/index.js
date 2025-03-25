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
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar, webURL } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        console.log(kirim);
        // setLoading(true);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => {
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');
                    });


            }
        })
    }

    const [PROVINSI, setPROVINSI] = useState([]);
    const [KOTA, setKOTA] = useState([]);
    const [KECAMATAN, setKECAMATAN] = useState([]);
    const [KELURAHAN, setKELURAHAN] = useState([]);

    const getProvinsi = () => {
        axios.get('https://ibnux.github.io/data-indonesia/provinsi.json').then(res => {
            let tmp = [];
            res.data.map(i => {
                tmp.push({
                    value: i.id + '#' + i.nama,
                    label: i.nama
                })
            })
            console.log(tmp);
            setPROVINSI(tmp);
        })
    }

    const getKotaKabupaten = (id_provinsi) => {
        axios.get(`https://ibnux.github.io/data-indonesia/kota/${id_provinsi}.json`).then(res => {
            let tmp = [];
            res.data.map(i => {
                tmp.push({
                    value: i.id + '#' + i.nama,
                    label: i.nama
                })
            })
            console.log(tmp);
            setKOTA(tmp);
        })
    }

    const getKecamatan = (id_kota) => {
        axios.get(`https://ibnux.github.io/data-indonesia/kecamatan/${id_kota}.json`).then(res => {
            let tmp = [];
            res.data.map(i => {
                tmp.push({
                    value: i.id + '#' + i.nama,
                    label: i.nama
                })
            })
            console.log(tmp);
            setKECAMATAN(tmp);
        })
    }

    const getKelurahan = (id_kecamatan) => {
        axios.get(`https://ibnux.github.io/data-indonesia/kelurahan/${id_kecamatan}.json`).then(res => {
            let tmp = [];
            res.data.map(i => {
                tmp.push({
                    value: i.id + '#' + i.nama,
                    label: i.nama
                })
            })
            console.log(tmp);
            setKELURAHAN(tmp);
        })
    }


    const handleChange = (key, value) => {
        setKirim({ ...kirim, [key]: value });
    };


    useEffect(() => {
        getProvinsi();
        setKirim({
            ...kirim,
            newfoto_user: null,
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <MyHeader title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>

                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {


                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 200,
                            maxHeight: 200
                        }, response => {
                            console.log('All Response = ', response);

                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                            });
                        });



                    }} style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: Color.blueGray[100],
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : webURL + kirim.foto_user,
                        }} />
                    </TouchableOpacity>
                </View>

                <MyInput
                    label="Nama Lengkap"
                    placeholder="Isi Nama Lengkap"
                    colorlabel={colors.primary}
                    value={kirim.nama_lengkap}
                    onChangeText={(x) => handleChange('nama_lengkap', x)}
                />
                <MyInput
                    label="Username"
                    placeholder="Isi Username"
                    colorlabel={colors.primary}
                    value={kirim.username}
                    onChangeText={(x) => handleChange('username', x)}
                />
                <MyInput
                    label="NIP"
                    placeholder="Isi NIP"
                    colorlabel={colors.primary}
                    value={kirim.nip}
                    onChangeText={(x) => handleChange('nip', x)}
                />
                <MyInput
                    label="Unit Kerja"
                    placeholder="Isi Unit Kerja"
                    colorlabel={colors.primary}
                    value={kirim.unit_kerja}
                    onChangeText={(x) => handleChange('unit_kerja', x)}
                />

                <View style={{ marginTop: 15 }}>
                    <Text
                        style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 15,
                            color: colors.primary,
                        }}
                    >
                        Alamat Unit Kerja
                    </Text>
                    <View style={{ padding: 10 }}>
                        <MyPicker
                            label="Provinsi"
                            data={PROVINSI}
                            selectedValue={kirim.provinsi}
                            onChangeText={(x) => {
                                setKirim({
                                    ...kirim,
                                    provinsi: x.split("#")[1],
                                    kode_provinsi: x.split("#")[0]
                                })
                                getKotaKabupaten(x.split("#")[0]);
                            }}
                        />
                        <MyPicker
                            label="Kota/Kabupaten"
                            data={KOTA}
                            selectedValue={kirim.kota_kabupaten}
                            onChangeText={(x) => {

                                setKirim({
                                    ...kirim,
                                    kota_kabupaten: x.split("#")[1],
                                    kode_kota_kabupaten: x.split("#")[0]
                                })

                                getKecamatan(x.split("#")[0]);
                            }}
                        />
                        <MyPicker
                            label="Kecamatan"
                            data={KECAMATAN}
                            selectedValue={kirim.kecamatan}
                            onChangeText={(x) => {
                                setKirim({
                                    ...kirim,
                                    kecamatan: x.split("#")[1],
                                    kode_kecamatan: x.split("#")[0]
                                })

                                getKelurahan(x.split("#")[0])
                            }}
                        />
                        <MyPicker
                            label="Kelurahan"
                            data={KELURAHAN}
                            selectedValue={kirim.kelurahan}
                            onChangeText={(x) => {
                                setKirim({
                                    ...kirim,
                                    kelurahan: x.split("#")[1],
                                    kode_kelurahan: x.split("#")[0]
                                })
                            }}
                        />
                    </View>
                </View>

                <MyInput
                    label="Nomor Telepon (62812 . . .)"
                    keyboardType="phone-pad"
                    placeholder="Isi Nomor Telepon"
                    colorlabel={colors.primary}
                    value={kirim.telepon}
                    onChangeText={(x) => handleChange('telepon', x)}
                />
                <MyInput
                    label="Email"
                    placeholder="Isi Email"
                    colorlabel={colors.primary}
                    value={kirim.email}
                    onChangeText={(x) => handleChange('email', x)}
                />


                <MyGap jarak={20} />
                <MyInput label="Password" iconname="lock-closed-outline" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                <MyGap jarak={20} />
                {loading && <MyLoading />}

                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})