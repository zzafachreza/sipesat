import {View, Text, ScrollView, Image, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, colors, fonts} from '../../utils';
import {MyButton, MyHeader} from '../../components';
import axios from 'axios';
import {apiURL, webURL} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';

export default function ProfileGuru({navigation, route}) {
  const user = route.params;

  const [data, setData] = useState([]);
  useEffect(() => {
    getPengawas();
  }, []);

  const getPengawas = () => {
    axios
      .post(apiURL + 'pengawas3', {
        fid_pengawas: user.id_pengguna,
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const updateStatus = (x, y) => {
    let kirim = {
      id_cek: x,
      status: y,
    };

    axios.post(apiURL + 'pilih_cek', kirim).then(res => {
      console.log(res.data);
      if (res.data.status == 200) {
        getPengawas();
      }
    });

    console.log(kirim);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Profile Kepala Sekolah / Guru" />

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

                  {item.status == 'Menunggu Konfirmasi' && (
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <Pressable
                        onPress={() => updateStatus(item.id_cek, 'Approved')}>
                        <View
                          style={{
                            marginRight: 10,
                            width: 100,

                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 10,
                            borderColor: colors.success,
                          }}>
                          <Icon
                            type="ionicon"
                            name="checkmark-circle"
                            color={colors.success}
                          />
                          <Text
                            style={{
                              marginLeft: 5,
                              fontFamily: fonts.secondary[600],
                              fontSize: 10,
                              color: colors.black,
                            }}>
                            Approved
                          </Text>
                        </View>
                      </Pressable>

                      <Pressable
                        onPress={() => updateStatus(item.id_cek, 'Decline')}>
                        <View
                          style={{
                            width: 100,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 10,
                            borderColor: colors.danger,
                          }}>
                          <Icon
                            type="ionicon"
                            name="close-circle"
                            color={colors.danger}
                          />
                          <Text
                            style={{
                              marginLeft: 5,
                              fontFamily: fonts.secondary[600],
                              fontSize: 10,
                              color: colors.black,
                            }}>
                            Decline
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  )}

                  {item.status == 'Approved' && (
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 11,
                        backgroundColor: colors.success,
                        color: colors.white,
                        textAlign: 'center',
                        borderRadius: 10,
                        padding: 4,
                      }}>
                      Approved
                    </Text>
                  )}

                  {item.status == 'Decline' && (
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 11,
                        backgroundColor: colors.danger,
                        color: colors.white,
                        textAlign: 'center',
                        borderRadius: 10,
                        padding: 4,
                      }}>
                      Decline
                    </Text>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
