import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { Image } from 'react-native'

export default function HomeGuru({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
    <MyHeader title="Menu"/>

    <ScrollView>
        <View style={{
            padding:10,
        }}>

        <View style={{
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
            padding:10,
        }}>

            <TouchableWithoutFeedback>
            <View>
            <View style={{
                    padding:10,
                    width:120,
                    height:120,
                    borderRadius:20,
                    borderWidth:1,
                    borderColor:colors.secondary,
                    justifyContent:"center",
                    alignItems:"center"
                    
                }}>
                
                <Image style={{
                    width:64,
                    height:64,
                    alignSelf:"center"
                }} source={require('../../assets/profile_pengawas.png')}/>
                </View>
                <Text style={{
                    textAlign:"center",
                    fontFamily:fonts.primary[600],
                    color:colors.secondary,
                    fontSize:15,
                    alignSelf:"center"
                   
                }}>Profil Pengawas{'\n'}Sekolah</Text>
            </View>
              
               
                
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback>
            <View>
            <View style={{
                    padding:10,
                    width:120,
                    height:120,
                    borderRadius:20,
                    borderWidth:1,
                    borderColor:colors.secondary,
                    justifyContent:"center",
                    alignItems:"center"
                    
                }}>
                
                <Image style={{
                    width:63,
                    height:64,
                    alignSelf:"center"
                }} source={require('../../assets/calendar_icon.png')}/>
                </View>
                <Text style={{
                    textAlign:"center",
                    fontFamily:fonts.primary[600],
                    color:colors.secondary,
                    fontSize:15
                   
                }}>Agenda{'\n'}Pengawas</Text>
            </View>
              
               
                
            </TouchableWithoutFeedback>

           

        </View>

        </View>
    </ScrollView>
    </View>
  )
}