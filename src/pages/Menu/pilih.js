import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyHeader } from '../../components';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';

export default function PilihPengawas({ navigation, route }) {
  const user = route.params;

  const [data, setData] = useState([]);
  useEffect(() => {
    getPengawas()
  }, []);

  const getPengawas = () => {
    axios.post(apiURL + 'pengawas2', {
      fid_guru: user.id_pengguna
    }).then(res => {
      console.log(res.data);
      setData(res.data);
    })
  }

  const CekPengawas = (x) => {
    let kirim = {
      fid_pengawas: x,
      fid_guru: user.id_pengguna
    }

    axios.post(apiURL + 'piih_add', kirim).then(res => {
      console.log(res.data);
      if (res.data.status == 200) {
        getPengawas();
      }
    })

    console.log(kirim);
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Profile Pengawas" />

      <FlatList data={data} renderItem={({ item, index }) => {
        return (
          <View style={{
            padding: 10,
            alignContent: 'center',
            alignItems: "center"
          }}>

            <View style={{
              padding: 10,
              borderColor: Color.blueGray[300],
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              height: 'auto', // Ubah height ke 'auto' agar card menyesuaikan konten
              // alignItems: "center"
            }}>

              <View>
                <Image style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain'
                }} source={{
                  uri: webURL + item.foto_user
                }} />
              </View>

              <View style={{ marginLeft: 10, flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, width: 80 }}>Nama</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>{item.nama_lengkap}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, width: 80 }}>NIP</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>{item.nip}</Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, width: 80 }}>Unit Kerja</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>{item.unit_kerja}</Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, width: 80 }}>Alamat</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, color: colors.secondary, flexShrink: 1, flexWrap: 'wrap' }}>
                    {item.kelurahan}, {item.kecamatan}, {item.kota_kabupaten}, {item.provinsi}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, width: 80 }}>Telepon</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>0897865657858</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, width: 80 }}>Email</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                  <Text style={{ fontFamily: fonts.secondary[600], fontSize: 10, color: colors.secondary, flexShrink: 1, flexWrap: 'wrap' }}>
                    {item.email}
                  </Text>
                </View>
                {
                  (item.jumlah == 0 && item.status == 0) &&
                  <MyButton onPress={() => CekPengawas(item.id_pengguna)} title="Pilih" />
                }

                {
                  (item.jumlah > 0 && item.status == 0 && item.status2 == 0) &&
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 11,
                    backgroundColor: '#FFDA16',
                    textAlign: 'center',
                    borderRadius: 10,
                    padding: 4,
                  }}>Sedang Menunggu Approval</Text>
                }

                {
                  (item.jumlah > 0 && item.status > 0) &&
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 11,
                    backgroundColor: colors.success,
                    color: colors.white,
                    textAlign: 'center',
                    borderRadius: 10,
                    padding: 4,
                  }}>Approved</Text>
                }

                {
                  (item.jumlah > 0 && item.status2 > 0) &&
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 11,
                    backgroundColor: colors.danger,
                    color: colors.white,
                    textAlign: 'center',
                    borderRadius: 10,
                    padding: 4,
                  }}>Decline</Text>
                }
              </View>
            </View>
          </View>
        )
      }} />
    </View>
  );
}