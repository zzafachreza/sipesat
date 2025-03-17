import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { CalendarView, MyCalendar, MyHeader } from '../../components'

export default function AgendaPengawas({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
        <MyHeader title="Agenda Pengawas"/>

        <ScrollView>
            <View style={{
                padding:10,

            }}>
              <CalendarView/>
            </View>
        </ScrollView>
    </View>
  )
}