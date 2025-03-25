import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fonts } from '../../utils';
import { MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function Register({ navigation }) {
  const [data, setData] = useState({
    role: 'Pengawas Sekolah',
    nama_lengkap: '',
    username: '',
    nip: '',
    unit_kerja: '',
    kode_provinsi: '',
    kode_kota_kabupaten: '',
    kode_kecamatan: '',
    kode_kelurahan: '',
    provinsi: '',
    kota_kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    telepon: '',
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleRegister = () => {


    console.log(data);

    if (
      !data.role ||
      !data.nama_lengkap ||
      !data.username ||
      !data.nip ||
      !data.unit_kerja ||
      !data.provinsi ||
      !data.kota_kabupaten ||
      !data.kecamatan ||
      !data.kelurahan ||
      !data.telepon ||
      !data.password
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
      .post(apiURL + 'register', data)
      .then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
          showMessage({
            type: 'success',
            backgroundColor: colors.success,
            color: colors.white,
            message: res.data.message,
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

  useEffect(() => {
    getProvinsi();
  }, [])
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
            marginTop: 0,
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
            onChangeText={(x) => handleChange('role', x)}
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
            label="NIP (Jika tidak punya isi angka 0)"
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
                data={PROVINSI}
                selectedValue={data.provinsi}
                onChangeText={(x) => {
                  setData({
                    ...data,
                    provinsi: x.split("#")[1],
                    kode_provinsi: x.split("#")[0]
                  })
                  getKotaKabupaten(x.split("#")[0]);
                }}
              />
              <MyPicker
                label="Kota/Kabupaten"
                data={KOTA}
                selectedValue={data.kota_kabupaten}
                onChangeText={(x) => {

                  setData({
                    ...data,
                    kota_kabupaten: x.split("#")[1],
                    kode_kota_kabupaten: x.split("#")[0]
                  })

                  getKecamatan(x.split("#")[0]);
                }}
              />
              <MyPicker
                label="Kecamatan"
                data={KECAMATAN}
                selectedValue={data.kecamatan}
                onChangeText={(x) => {
                  setData({
                    ...data,
                    kecamatan: x.split("#")[1],
                    kode_kecamatan: x.split("#")[0]
                  })

                  getKelurahan(x.split("#")[0])
                }}
              />
              <MyPicker
                label="Kelurahan"
                data={KELURAHAN}
                selectedValue={data.kelurahan}
                onChangeText={(x) => {
                  setData({
                    ...data,
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
            value={data.telepon}
            onChangeText={(x) => handleChange('telepon', x)}
          />
          <MyInput
            label="Email"
            placeholder="Isi Email ( opsional )"
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