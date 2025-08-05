import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, windowHeight, windowWidth} from '../../utils';
import {MyButton, MyHeader} from '../../components';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';

import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';

export default function ShowPDF({navigation, route}) {
  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    if (Platform.Version >= 33) {
      // Android 13+ (API 33+)
      return 'granted';
    } else if (Platform.Version >= 30) {
      // Android 11-12 (API 30-32)
      return true; // Scoped storage, no permission needed for downloads
    } else {
      // Android 10 and below
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  const downloadPDF = async () => {
    const {config, fs} = RNFetchBlob;
    const downloadDir = fs.dirs.DownloadDir;
    const filePath = `${downloadDir}/${moment().format(
      'YYMMDDHHmmsss',
    )}_downloaded.pdf`;

    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading PDF',
      },
    })
      .fetch('GET', route.params.link)
      .then(res => {
        Alert.alert('Download Selesai', `File disimpan di ${res.path()}`);
      })
      .catch(error => {
        Alert.alert('Error', 'Gagal mengunduh file');
        console.error(error);
      });
  };

  const downloadPDFWithRNFS = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Storage permission is required');
        return;
      }

      const fileName = `${moment().format('YYMMDDHHmmsss')}_downloaded.pdf`;
      const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const options = {
        fromUrl: route.params.link,
        toFile: downloadDest,
        background: true,
        discretionary: true,
        progress: res => {
          console.log(
            'Progress:',
            (res.bytesWritten / res.contentLength) * 100,
          );
        },
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        Alert.alert(
          'Download Selesai',
          `File berhasil disimpan di folder Downloads\nNama file: ${fileName}`,
        );
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Gagal mengunduh file. Silakan coba lagi.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <MyHeader title="Lihat File PDF" />
      <Pdf
        trustAllCerts={false}
        source={{uri: route.params.link, cache: true}}
        onLoadComplete={numberOfPages => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{flex: 1}}
      />
      <MyButton title="Download PDF" onPress={downloadPDFWithRNFS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
