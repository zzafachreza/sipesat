import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function ProfilPengawas({ navigation }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Profile Pengawas" />

      <ScrollView>
        <View style={{
          padding: 10,
          alignContent:'center',
          alignItems:"center"
        }}>

          <View style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: 321,
            height: 'auto', // Ubah height ke 'auto' agar card menyesuaikan konten
            alignItems:"center"
          }}>

            <View>
              <Image style={{
                width: 80,
                height: 118
              }} source={require('../../assets/dummy_profile.png')} />
            </View>

            <View style={{ marginLeft: 10, flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, width: 80 }}>Nama Pengawas</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>Ridho Firmansyah</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, width: 80 }}>NIP</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>23757825478</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, width: 80 }}>Unit Kerja</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>Unit Kerja Citarum</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, width: 80 }}>Alamat</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.secondary, flexShrink: 1, flexWrap: 'wrap' }}>
                  Bandung Wetan, Citarum, Kota Bandung, Jawa Barat
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, width: 80 }}>Nomor Telepon</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.secondary, flexShrink: 1 }}>0897865657858</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, width: 80 }}>Email</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, marginHorizontal: 5 }}>:</Text>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 10, color: colors.secondary, flexShrink: 1, flexWrap: 'wrap' }}>
                  rdfirmansyah@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}