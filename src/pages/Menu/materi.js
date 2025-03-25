import { View, Text, ScrollView, TouchableNativeFeedback, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';

export default function Materi({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post(apiURL + 'materi').then(res => {
      console.log(res.data);
      setData(res.data)
    })
  }, [])

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Materi" />
      <View style={{
        flex: 1,
        padding: 10
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <Pressable onPress={() => navigation.navigate('MateriDetail', item)}>
              <View style={{
                // padding: 10,
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
                  }}>Selengkapnnya ></Text>
                </View>
              </View>

            </Pressable>
          )
        }} />

      </View>
    </View >
  );
}