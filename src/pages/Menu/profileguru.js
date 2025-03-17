import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../utils';
import { MyHeader } from '../../components';

export default function ProfileGuru({ navigation }) {
  const [dataGuru, setDataGuru] = useState([]);

  // Contoh data dari database (bisa diganti dengan data dari API)
  const fetchData = () => {
    const data = [
      {
        nama: 'Indah Permata Sari',
        nip: '53756463268',
        unitKerja: 'Unit Kerja Citarum',
        alamat: 'Bandung Wetan, Citarum, Kota Bandung, Jawa Barat',
        nomorTelepon: '081237673832',
        email: 'indahps@gmail.com',
    
      },
      // Tambahkan data lain jika ada
    ];
    setDataGuru(data);
  };

  useEffect(() => {
    fetchData(); // Fetch data saat komponen dimount
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Profil Kepala Sekolah/Guru" />

      <ScrollView>
        <View style={{ padding: 10 }}>
          {dataGuru.map((guru, index) => (
            <View key={index} style={styles.card}>
              {/* Foto dan Detail */}
              <View style={{ flexDirection: 'row' }}>
                {/* Foto */}
                <Image
                  source={require('../../assets/guru_dummy.png')}
                  style={styles.foto}
                />

                {/* Detail */}
                <View style={{ flex: 1, marginLeft: 10 }}>
                  {/* Nama KS/Guru */}
                  <View style={styles.row}>
                    <Text style={styles.label}>Nama KS/Guru</Text>
                    <Text style={styles.value}>: {guru.nama}</Text>
                  </View>

                  {/* NIP */}
                  <View style={styles.row}>
                    <Text style={styles.label}>NIP</Text>
                    <Text style={styles.value}>: {guru.nip}</Text>
                  </View>

                  {/* Unit Kerja */}
                  <View style={styles.row}>
                    <Text style={styles.label}>Unit Kerja</Text>
                    <Text style={styles.value}>: {guru.unitKerja}</Text>
                  </View>

                  {/* Alamat */}
                  <View style={styles.row}>
                    <Text style={styles.label}>Alamat</Text>
                    <Text style={styles.value}>: {guru.alamat}</Text>
                  </View>

                  {/* Nomor Telepon */}
                  <View style={styles.row}>
                    <Text style={styles.label}>Nomor Telepon</Text>
                    <Text style={styles.value}>: {guru.nomorTelepon}</Text>
                  </View>

                  {/* Email */}
                  <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>: {guru.email}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foto: {
    width: 80,
    height: 118,
    borderRadius: 10, // Jika ingin foto memiliki sudut melengkung
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: colors.text,
    width: '30%', // Lebar untuk label
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: colors.text,
    flex: 1, // Mengisi sisa ruang
  },
});