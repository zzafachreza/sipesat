import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import { fonts } from '../../utils';
import { MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default function Register({ navigation }) {
  const [data, setData] = useState({
    role: '',
    nama_lengkap: '',
    username: '',
    nip: '',
    unit_kerja: '',
    provinsi: '',
    kota_kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    no_tlp: '',
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleRegister = () => {
    const {
      role,
      nama_lengkap,
      username,
      nip,
      unit_kerja,
      provinsi,
      kota_kabupaten,
      kecamatan,
      kelurahan,
      no_tlp,
      email,
      password,
    } = data;

    if (
      !role ||
      !nama_lengkap ||
      !username ||
      !nip ||
      !unit_kerja ||
      !provinsi ||
      !kota_kabupaten ||
      !kecamatan ||
      !kelurahan ||
      !no_tlp ||
      !email ||
      !password
    ) {
      showMessage({
        type: 'danger',
        backgroundColor: colors.danger,
        color: colors.white,
        message: 'Semua Field Harus Diisi!',
        position: 'top',
        style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
        textStyle: { fontFamily: fonts.primary[600] },
      });
      return;
    }

    console.log('Data yang dikirim: ', data);
    axios
      .post('API_KEY', data)
      .then((res) => {
        if (res.data.status === 'success') {
          showMessage({
            type: 'success',
            backgroundColor: colors.success,
            color: colors.white,
            message: 'Selamat Anda Berhasil Mendaftar!',
          });
          navigation.navigate('Login');
        } else {
          showMessage({
            type: 'danger',
            backgroundColor: colors.danger,
            color: colors.white,
            message: 'Akun Sudah Terdaftar!',
          });
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  return (
    <ImageBackground
      source={require('../../assets/bgreg.png')}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: fonts.primary[600],
            fontSize: 24,
            color: colors.white,
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          Daftar
        </Text>
      </View>
      <ScrollView>
        <View style={{ padding: 20, marginTop: 20 }}>
          <MyPicker
            label="Daftar sebagai"
            data={[
              { label: 'Pengawas Sekolah', value: 'Pengawas Sekolah' },
              { label: 'Kepala Sekolah', value: 'Kepala Sekolah' },
              { label: 'Guru', value: 'Guru' },
            ]}
            selectedValue={data.role}
            onValueChange={(x) => handleChange('role', x)}
          />
          <MyInput
            label="Nama Lengkap"
            placeholder="Isi Nama Lengkap"
            colorlabel={colors.primary}
            value={data.nama_lengkap}
            onChangeText={(x) => handleChange('nama_lengkap', x)}
          />
          <MyInput
            label="Username"
            placeholder="Isi Username"
            colorlabel={colors.primary}
            value={data.username}
            onChangeText={(x) => handleChange('username', x)}
          />
          <MyInput
            label="NIP"
            placeholder="Isi NIP"
            colorlabel={colors.primary}
            value={data.nip}
            onChangeText={(x) => handleChange('nip', x)}
          />
          <MyInput
            label="Unit Kerja"
            placeholder="Isi Unit Kerja"
            colorlabel={colors.primary}
            value={data.unit_kerja}
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
                selectedValue={data.provinsi}
                onValueChange={(x) => handleChange('provinsi', x)}
              />
              <MyPicker
                label="Kota/Kabupaten"
                selectedValue={data.kota_kabupaten}
                onValueChange={(x) => handleChange('kota_kabupaten', x)}
              />
              <MyPicker
                label="Kecamatan"
                selectedValue={data.kecamatan}
                onValueChange={(x) => handleChange('kecamatan', x)}
              />
              <MyPicker
                label="Kelurahan"
                selectedValue={data.kelurahan}
                onValueChange={(x) => handleChange('kelurahan', x)}
              />
            </View>
          </View>

          <MyInput
            label="Nomor Telepon"
            placeholder="Isi Nomor Telepon"
            colorlabel={colors.primary}
            value={data.no_tlp}
            onChangeText={(x) => handleChange('no_tlp', x)}
          />
          <MyInput
            label="Email"
            placeholder="Isi Email"
            colorlabel={colors.primary}
            value={data.email}
            onChangeText={(x) => handleChange('email', x)}
          />
          <MyInput
            label="Password"
            placeholder="Isi Password"
            colorlabel={colors.primary}
            secureTextEntry={true}
            value={data.password}
            onChangeText={(x) => handleChange('password', x)}
          />

          <TouchableNativeFeedback onPress={handleRegister}>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.button,
                borderRadius: 30,
                marginTop: 20,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  color: colors.primary,
                  textAlign: 'center',
                }}
              >
                Daftar
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontFamily: fonts.primary[500],
                color: '#C9C5C8',
                textAlign: 'center',
                marginTop: 10,
                fontSize: 12,
              }}
            >
              Sudah memiliki akun? Silakan{' '}
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  color: colors.primary,
                }}
              >
                Masuk
              </Text>
            </Text>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}