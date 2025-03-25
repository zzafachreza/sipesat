import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton, MyHeader } from '../../components'
import axios from 'axios';
import { apiURL, getData, MYAPP, webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
import { showMessage } from 'react-native-flash-message';
export default function PengumumanDetail({ navigation, route }) {
  const item = route.params;
  console.log(item);
  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(res => setUser(res));
  }, [])
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Pengumuman Detail" />
      <ScrollView>
        <Image style={{
          width: '100%',
          height: 220,
        }} source={{
          uri: webURL + item.gambar
        }} />

        <View style={{
          padding: 10,
        }}>




          <RenderHTML

            tagsStyles={{
              div: {
                fontFamily: fonts.body3.fontFamily,
                fontSize: 12,
                textAlign: 'justify',
                lineHeight: 20,
                color: colors.black,
              },
              p: {
                fontFamily: fonts.body3.fontFamily,
                fontSize: 12,
                textAlign: 'justify',
                lineHeight: 20,
                color: colors.black,
              },

            }}
            systemFonts={[fonts.body3.fontFamily]}
            contentWidth={windowWidth}
            source={{
              html: item.keterangan
            }}
          />

        </View>

      </ScrollView>
      {user.role == 'Pengawas Sekolah' &&
        <View style={{
          padding: 10,
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1
          }}>
            <MyButton title="Edit" onPress={() => navigation.navigate('ShowWeb', {
              link: webURL + 'pengumuman/edit/' + item.id_pengumuman,
              judul: 'Edit Pengumuman'
            })} />
          </View>
          <View style={{
            flex: 1
          }}>
            <MyButton title="Hapus" onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
              {
                text: 'TIDAK'
              },
              {
                text: 'HAPUS',
                onPress: () => {
                  axios.post(apiURL + 'delete_data', {
                    modul: 'pengumuman',
                    id: item.id_pengumuman,
                  }).then(res => {
                    if (res.data.status == 200) {
                      showMessage({
                        type: 'success',
                        message: res.data.message
                      });
                      navigation.goBack();
                    }
                    console.log(res.data);
                  })
                }
              }
            ])} warna={colors.danger} />
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({})