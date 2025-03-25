import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyHeader } from '../../components'
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';

export default function InfoAplikasi({ navigation }) {

  const [comp, setComp] = useState({});

  useEffect(() => {
    axios.post(apiURL + 'company').then(res => {
      console.log(res.data[0]);
      setComp(res.data[0]);
    })
  }, [])
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Info Aplikasi" />

      <ScrollView>
        <View style={{
          padding: 10,
        }}>

          <Text style={{
            fontFamily: fonts.primary[600],
            textAlign: "center",
            color: colors.primary,
            fontSize: 20,
            marginTop: 20
          }}>{comp.nama}</Text>

          <View style={{
            padding: 10
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
                html: comp.deskripsi
              }}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  )
}