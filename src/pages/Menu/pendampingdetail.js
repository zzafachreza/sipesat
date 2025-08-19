import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts, windowWidth} from '../../utils';
import {MyButton, MyHeader} from '../../components';
import axios from 'axios';
import {apiURL, getData, MYAPP, webURL} from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {TouchableOpacity} from 'react-native';

export default function PedampinganDetail({navigation, route}) {
  const item = route.params;
  console.log(item);
  const [modalVisible, setModalVisible] = useState(false); // State untuk modal

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

      // Sanitize filename untuk menghindari karakter yang tidak valid
      const sanitizeFilename = filename => {
        return filename
          ? filename.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_')
          : 'komunitas_belajar';
      };

      // Tentukan nama file dan direktori berdasarkan versi Android
      const timestamp = new Date().getTime();
      const baseFileName = sanitizeFilename(item.judul || 'komunitas_belajar');
      const fileName = `${baseFileName}_${timestamp}`;

      // Tentukan direktori penyimpanan
      let directory;
      if (Platform.OS === 'android') {
        if (Platform.Version >= 34) {
          // Android 14+ - gunakan direktori Documents
          directory = 'Documents';
        } else if (Platform.Version >= 30) {
          // Android 11-13 - gunakan Documents sebagai alternatif yang aman
          directory = 'Documents';
        } else {
          // Android 10 ke bawah
          directory = 'Download';
        }
      } else {
        directory = 'Download';
      }

      let options = {
        html: `<!DOCTYPE html>
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
        ${item.tanggal || '-'}
        </p>
        
        <div class="row">
            <p class="label">Nama Komunitas Belajar</p>
            <p class="separator">:</p>
            <p class="value">${item.nama || '-'}</p>
        </div>

        <div class="row">
            <p class="label">Waktu Pendampingan</p>
            <p class="separator">:</p>
            <p class="value">${item.tanggal || '-'}</p>
        </div>

        <div class="row">
            <p class="label">Tujuan Pendampingan</p>
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
            : '<p style="font-style: italic; color: #666; margin-top: 10px;">Tidak ada dokumentasi</p>'
        }
    </div>
</body>
</html>
`,
        fileName: fileName,
        directory: directory,
      };

      let file = await RNHTMLtoPDF.convert(options);

      if (file.filePath) {
        console.log('PDF berhasil dibuat:', file.filePath);

        // Pesan yang lebih informatif berdasarkan lokasi penyimpanan
        const locationMessage =
          Platform.OS === 'android' && Platform.Version >= 30
            ? 'PDF berhasil dibuat dan tersimpan di folder Documents'
            : `PDF berhasil dibuat: ${file.filePath}`;

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
      } else if (error.message && error.message.includes('filename')) {
        Alert.alert(
          'Error',
          'Nama file tidak valid. Menggunakan nama default.',
        );
      } else {
        Alert.alert(
          'Error',
          'Terjadi kesalahan saat membuat atau membagikan PDF.',
        );
      }
    }
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(res => setUser(res));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Pendampingan Komunitas Belajar Detail" />
      <ScrollView>
        <View
          style={{
            margin: 10,
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
              {item.nama}
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
              Waktu Pendampingan
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
              Tujuan Pendampingan
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
              Catatan
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
              {item.catatan}
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
              Dokumentasi
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{
                uri: webURL + item.gambar,
              }}
              style={{
                width: windowWidth - 50,
                borderRadius: 5,
                height: 200,
              }}
            />
          </TouchableOpacity>
          <MyButton
            title="Download PDF"
            warna={colors.danger}
            onPress={createPDF}
          />
        </View>
      </ScrollView>
      {user.role == 'Pengawas Sekolah' && (
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <MyButton
              title="Edit"
              onPress={() =>
                navigation.navigate('ShowWeb', {
                  link: webURL + 'pendampingan/edit/' + item.id_pendampingan,
                  judul: 'Edit Pendampingan',
                })
              }
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <MyButton
              title="Hapus"
              onPress={() =>
                Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                  {
                    text: 'TIDAK',
                  },
                  {
                    text: 'HAPUS',
                    onPress: () => {
                      axios
                        .post(apiURL + 'delete_data', {
                          modul: 'pendampingan',
                          id: item.id_pendampingan,
                        })
                        .then(res => {
                          if (res.data.status == 200) {
                            showMessage({
                              type: 'success',
                              message: res.data.message,
                            });
                            navigation.goBack();
                          }
                          console.log(res.data);
                        });
                    },
                  },
                ])
              }
              warna={colors.danger}
            />
          </View>
        </View>
      )}

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Image
            style={styles.fullImage}
            source={{uri: webURL + item.gambar}}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});
