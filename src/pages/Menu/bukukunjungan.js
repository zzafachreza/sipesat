import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  Pressable,
  FlatList,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, colors, fonts, windowWidth} from '../../utils';
import {MyButton, MyGap, MyHeader} from '../../components';
import {Icon} from 'react-native-elements';
import {apiURL, webURL} from '../../utils/localStorage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export default function BukuKunjugan({navigation}) {
  const [data, setData] = useState([]);
  const __getDataBaseAPI = () => {
    axios.post(apiURL + 'kunjungan').then(res => {
      setData(res.data);
    });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      __getDataBaseAPI();
    }
  }, [isFocused]);

  const createPDF = async () => {
    try {
      // Meminta izin penyimpanan berdasarkan versi Android
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          // Android 13+ menggunakan scoped storage, tidak perlu izin khusus untuk direktori Download
          console.log('Android 13+: Menggunakan scoped storage');
        } else if (Platform.Version >= 30) {
          // Android 11-12: Periksa akses ke direktori Download
          const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          if (!hasPermission) {
            // Untuk Android 11+, gunakan MediaStore atau Documents API
            Alert.alert(
              'Info',
              'File akan disimpan dalam folder aplikasi yang dapat diakses.',
            );
          }
        } else {
          // Android 10 ke bawah
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              'Izin Diperlukan',
              'Aplikasi memerlukan izin untuk menyimpan file.',
            );
            return;
          }
        }
      }

      let HTML = '';

      for (const item of data) {
        HTML += `<!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Detail Kunjungan</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        padding: 20px;
                        margin: 0;
                    }
                    .container {
                        margin: 10px;
                        padding: 15px;
                        background-color: white;
                        border-radius: 10px;
                        border: 1px solid #ddd;
                        box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                        page-break-inside: avoid;
                    }
                    .row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;
                    }
                    .label {
                        flex: 1;
                        font-size: 10px;
                        color: #333;
                        width: 40%;
                    }
                    .separator {
                        flex: 0.1;
                        font-size: 10px;
                        color: #007bff;
                    }
                    .value {
                        flex: 1;
                        font-size: 10px;
                        color: #007bff;
                        word-wrap: break-word;
                    }
                    .image {
                        width: calc(100% - 50px);
                        border-radius: 5px;
                        height: 300px;
                        object-fit: contain;
                        margin-top: 10px;
                    }
                    @media print {
                        .container {
                            page-break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p style="font-weight: bold; font-size: 10px; color: #C9C5C8; margin-bottom: 10px;">
                    ${item.tanggal}
                    </p>
                    
                    <div class="row">
                        <p class="label">Nama Satuan Pendidikan</p>
                        <p class="separator">:</p>
                        <p class="value">${item.satuan || '-'}</p>
                    </div>
            
                    <div class="row">
                        <p class="label">Waktu Kunjungan</p>
                        <p class="separator">:</p>
                        <p class="value">${item.tanggal || '-'}</p>
                    </div>
            
                    <div class="row">
                        <p class="label">Tujuan Kunjungan</p>
                        <p class="separator">:</p>
                        <p class="value">${item.tujuan || '-'}</p>
                    </div>
            
                    <div class="row">
                        <p class="label">Catatan</p>
                        <p class="separator">:</p>
                        <p class="value">${item.catatan || '-'}</p>
                    </div>
            
                    <div class="row">
                        <p class="label">Dokumentasi</p>
                    </div>
            
                    ${
                      item.gambar
                        ? `<img src="${
                            webURL + item.gambar
                          }" class="image" alt="Dokumentasi" />`
                        : '<p style="font-style: italic; color: #666;">Tidak ada dokumentasi</p>'
                    }
                </div>
            </body>
            </html>`;
      }

      // Gunakan timestamp untuk nama file unik
      const timestamp = new Date().getTime();
      const fileName = `buku_kunjungan_all_${timestamp}`;

      // Konfigurasi berbeda berdasarkan versi Android
      let options = {
        html: HTML,
        fileName: fileName,
        directory:
          Platform.OS === 'android' && Platform.Version >= 30
            ? 'Documents'
            : 'Download',
      };

      // Untuk Android 14+, pastikan menggunakan direktori yang dapat diakses
      if (Platform.OS === 'android' && Platform.Version >= 34) {
        // Android 14+ - gunakan direktori Documents sebagai alternatif yang lebih aman
        options.directory = 'Documents';
      }

      let file = await RNHTMLtoPDF.convert(options);

      if (file.filePath) {
        console.log('PDF berhasil dibuat:', file.filePath);

        // Pesan yang lebih informatif berdasarkan lokasi penyimpanan
        const locationMessage =
          Platform.OS === 'android' && Platform.Version >= 30
            ? 'PDF tersimpan di folder Documents'
            : `PDF tersimpan di ${file.filePath}`;

        Alert.alert('Sukses', locationMessage);

        try {
          // Bagikan file setelah dibuat
          await Share.open({
            url:
              Platform.OS === 'android'
                ? `file://${file.filePath}`
                : file.filePath,
            type: 'application/pdf',
            failOnCancel: false,
          });
        } catch (shareError) {
          console.log('Error sharing file:', shareError);
          // Jika sharing gagal, setidaknya file sudah tersimpan
          Alert.alert(
            'Info',
            'PDF berhasil disimpan, namun gagal membagikan file.',
          );
        }
      } else {
        Alert.alert('Gagal', 'Gagal membuat PDF.');
      }
    } catch (error) {
      console.error('Error creating PDF:', error);

      // Error handling yang lebih spesifik
      if (error.message && error.message.includes('permission')) {
        Alert.alert(
          'Error',
          'Tidak memiliki izin untuk menyimpan file. Coba lagi atau periksa pengaturan aplikasi.',
        );
      } else if (error.message && error.message.includes('storage')) {
        Alert.alert(
          'Error',
          'Tidak cukup ruang penyimpanan atau direktori tidak dapat diakses.',
        );
      } else {
        Alert.alert(
          'Error',
          'Terjadi kesalahan saat membuat atau membagikan PDF.',
        );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Buku Kunjungan" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <MyButton
          onPress={createPDF}
          title="Unduh Semua"
          Icons="download-outline"
          iconColor="white"
        />
        <MyGap jarak={10} />
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => navigation.navigate('KunjunganDetail', item)}>
                <View
                  key={index}
                  style={{
                    padding: 15,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      fontSize: 10,
                      color: '#C9C5C8',
                      marginBottom: 10,
                    }}>
                    {moment(item.tanggal).format('DD MMMM YYYY')}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Nama Satuan Pendidikan
                    </Text>
                    <Text
                      style={{
                        flex: 0.1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      {item.satuan}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Waktu Kunjungan
                    </Text>
                    <Text
                      style={{
                        flex: 0.1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      {item.tanggal}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Tujuan Kunjungan
                    </Text>
                    <Text
                      style={{
                        flex: 0.1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      :
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      {item.tujuan}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('ShowWeb', {
              link: webURL + 'kunjungan/add',
              judul: 'Tambah Buku Kunjungan',
            })
          }>
          <View
            style={{
              alignSelf: 'flex-end',
              margin: 20,
              width: 60,
              height: 60,
              backgroundColor: colors.primary,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="add" color={colors.white} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
