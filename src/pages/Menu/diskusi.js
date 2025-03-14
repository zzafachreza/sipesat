import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader, MyInput } from '../../components'

export default function Diskusi({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>

    <MyHeader title="Diskusi Seputar Pendidikan"/>

    <ScrollView>
        <View style={{
            padding:10
        }}>

        </View>
    </ScrollView>

    <View style={{
        padding:10
    }}>

    <MyInput  placeholder="Tambahkan komentar Anda disini"/>

       <TouchableNativeFeedback >
                             <View style={{
                                 padding:10,
                                 backgroundColor:colors.button,
                                 borderRadius:30,
                                 marginTop:10,
                                 borderWidth:1,
                                 borderColor:colors.primary

     
                             }}>
                             <Text style={{
                                 fontFamily:fonts.primary[600], 
                                 color:colors.primary,
                                 textAlign:"center"
                                 }}>Tambah Komentar</Text>
     
                             </View>
                         </TouchableNativeFeedback>
     
            

    </View>
      
    </View>
  )
}