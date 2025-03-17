import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyHeader, MyInput, MyTimePicker } from '../../components'
import { TouchableNativeFeedback } from 'react-native'

export default function TambahMeeting({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}> 

    <MyHeader title="Tambah Meeting"/>

    <ScrollView>
        <View style={{
            padding:10
        }}>

        <MyInput label="Judul Meeting" colorlabel={colors.primary}/>
        <MyCalendar label="Tanggal Meeting"/>
        <MyTimePicker label="Waktu Meeting"/>
        <MyInput label="Link Meeting"  colorlabel={colors.primary}/>

         <TouchableNativeFeedback>
                                            <View style={{
                                                padding:10,
                                                backgroundColor:colors.success,
                                                borderRadius:20,
                                                marginTop:20
        
                                            }}>
                                            <Text style={{
                                                fontFamily:fonts.primary[600],
                                                textAlign:"center",
                                                color:colors.white,
                                            }}>Simpan</Text>
        
                                            </View>
                                        </TouchableNativeFeedback>
        

        </View>
    </ScrollView>
    
    </View>
  )
}