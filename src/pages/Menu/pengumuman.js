import { View, Text, ScrollView, TouchableNativeFeedback, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowWidth } from '../../utils'
import { MyHeader } from '../../components'
import { Icon } from 'react-native-elements'
import { apiURL, webURL } from '../../utils/localStorage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

export default function Pengumuman({ navigation, route }) {
  const user = route.params;

  const [data, setData] = useState([]);
  const __getDataBaseAPI = () => {
    axios.post(apiURL + 'pengumuman').then(res => {

      setData(res.data);
    })
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      __getDataBaseAPI();
    }

  }, [isFocused]);


  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Pengumuman" />
      <View style={{
        flex: 1,
        padding: 10,
      }}>

        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <Pressable onPress={() => navigation.navigate('PengumumanDetail', item)}>
              <View style={{
                marginBottom: 10,

                overflow: 'hidden',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Color.blueGray[400],
              }}>
                <Image style={{
                  width: '100%',
                  height: 220,
                }} source={{
                  uri: webURL + item.gambar
                }} />
                <View style={{
                  padding: 10,
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 16,
                  }}>{item.judul}</Text>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    textAlign: 'right'
                  }}>Selengkapnya ></Text>
                </View>
              </View>

            </Pressable>
          )
        }} />

      </View>
      <View>
        {
          user.role == 'Pengawas Sekolah' &&
          <Pressable onPress={() => navigation.navigate('ShowWeb', {
            link: webURL + 'pengumuman/add',
            judul: 'Tambah Pengumuman'
          })}>
            <View style={{
              alignSelf: 'flex-end',
              margin: 20,
              width: 60,
              height: 60,
              backgroundColor: colors.primary,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Icon type='ionicon' name='add' color={colors.white} />
            </View>
          </Pressable>
        }
      </View>
    </View>
  )
}