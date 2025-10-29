import {View, Text, ScrollView, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, colors, fonts} from '../../utils';
import {MyHeader} from '../../components';
import axios from 'axios';
import {apiURL, webURL} from '../../utils/localStorage';

export default function ProfilPengawas({navigation}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post(apiURL + 'pengawas').then(res => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Profile Pengawas" />

      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                padding: 10,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
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
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: webURL + item.foto_user,
                    }}
                  />
                </View>

                <View style={{marginLeft: 10, flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        width: 80,
                      }}>
                      Nama
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        marginHorizontal: 5,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        color: colors.secondary,
                        flexShrink: 1,
                      }}>
                      {item.nama_lengkap}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        width: 80,
                      }}>
                      NIP
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        marginHorizontal: 5,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        color: colors.secondary,
                        flexShrink: 1,
                      }}>
                      {item.nip}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        width: 80,
                      }}>
                      Unit Kerja
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        marginHorizontal: 5,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        color: colors.secondary,
                        flexShrink: 1,
                      }}>
                      {item.unit_kerja}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        width: 80,
                      }}>
                      Alamat
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        marginHorizontal: 5,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        color: colors.secondary,
                        flexShrink: 1,
                        flexWrap: 'wrap',
                      }}>
                      {item.kelurahan}, {item.kecamatan}, {item.kota_kabupaten},{' '}
                      {item.provinsi}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        width: 80,
                      }}>
                      Telepon
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        marginHorizontal: 5,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        color: colors.secondary,
                        flexShrink: 1,
                      }}>
                      {item.telepon}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        width: 80,
                      }}>
                      Email
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        marginHorizontal: 5,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 10,
                        color: colors.secondary,
                        flexShrink: 1,
                        flexWrap: 'wrap',
                      }}>
                      {item.email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
