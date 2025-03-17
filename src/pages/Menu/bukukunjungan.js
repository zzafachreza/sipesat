import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'
import { TouchableNativeFeedback } from 'react-native'
import { Icon } from 'react-native-elements'

export default function BukuKunjungan({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
        <MyHeader title="Buku Kunjungan"/>
        
        <ScrollView>
            <View style={{
                padding:10,
            }}>

            </View>
        </ScrollView>

        <View style={{
            padding:20,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:'center'
        }}>

        <TouchableNativeFeedback onPress={()=> navigation.navigate("TambahBukuKunjungan")}>
            <View style={{
                padding:10,
                backgroundColor:colors.primary,
                width:50,
                height:50,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:100
            }}>

            <Icon type='ionicon' name='add' size={20} color={colors.white}/>

            </View>
        </TouchableNativeFeedback>

        </View>
    </View>
  )
}