import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, colors, fonts} from '../../utils';
import {MyHeader, MyInput} from '../../components';
import axios from 'axios';
import {apiURL, getData, MYAPP, webURL} from '../../utils/localStorage';
import {Image} from 'react-native';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import {Icon} from 'react-native-elements';

export default function Diskusi({navigation}) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    id_pengguna: 0,
  });
  const [kirim, setKirim] = useState('');
  const __getDataDiskusi = () => {
    axios.post(apiURL + 'diskusi').then(res => {
      console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    __getDataDiskusi();
    getData('user').then(u => {
      if (u) {
        setUser(u);
      }
    });
  }, []);

  const sendDiskusi = () => {
    getData('user').then(res => {
      if (!res) {
        showMessage({
          type: 'danger',
          message: 'Kamu harus login terlebih dahulu !',
        });
        navigation.navigate('Login');
      } else {
        axios
          .post(apiURL + 'add_diskusi', {
            komentar: kirim,
            fid_pengguna: res.id_pengguna,
          })
          .then(rr => {
            if (rr.data.status == 200) {
              showMessage({
                type: 'success',
                message: rr.data.message,
              });
              __getDataDiskusi();
              setKirim('');
            }
            console.log(rr.data);
          });
      }
    });
  };

  const deleteData = x => {
    Alert.alert(MYAPP, 'Apakah kamu akan hapus ini ?', [
      {text: 'TIDAK'},
      {
        text: 'HAPUS',
        onPress: () => {
          axios
            .post(apiURL + 'delete_data', {
              modul: 'diskusi',
              id: x,
            })
            .then(res => {
              if (res.data.status == 200) {
                showMessage({
                  type: 'success',
                  message: res.data.message,
                });
                __getDataDiskusi();
              }
              console.log(res.data);
            });
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Diskusi Seputar Pendidikan" />

      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Color.blueGray[200],
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      padding: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri: webURL + item.foto_user,
                        }}
                        style={{
                          width: 40,
                          height: 40,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          paddingLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                          }}>
                          {item.nama_lengkap}
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 9,
                            color: colors.primary,
                          }}>
                          {moment(item.tanggal + ' ' + item.jam).format(
                            'DD MMMM YYYY | HH:mm',
                          )}{' '}
                          WIB
                        </Text>
                      </View>
                      {user.id_pengguna == item.fid_pengguna && (
                        <Pressable onPress={() => deleteData(item.id_diskusi)}>
                          <Icon
                            type="ionicon"
                            name="trash"
                            color={colors.danger}
                          />
                        </Pressable>
                      )}
                    </View>
                  </View>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontFamily: fonts.secondary[600],
                      fontSize: 12,
                    }}>
                    {item.komentar}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            padding: 10,
          }}>
          <MyInput
            value={kirim}
            onChangeText={x => setKirim(x)}
            placeholder="Tambahkan komentar Anda disini"
          />

          <Pressable onPress={sendDiskusi}>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.button,
                borderRadius: 30,
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.primary,
              }}>
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  color: colors.primary,
                  textAlign: 'center',
                }}>
                Tambah Komentar
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
