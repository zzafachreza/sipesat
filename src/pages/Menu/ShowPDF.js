import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, windowHeight, windowWidth } from '../../utils';
import { MyButton, MyHeader } from '../../components';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';

export default function ShowPDF({ navigation, route }) {
    const downloadPDF = async () => {
        const { config, fs } = RNFetchBlob;
        const downloadDir = fs.dirs.DownloadDir;
        const filePath = `${downloadDir}/${moment().format('YYMMDDHHmmsss')}_downloaded.pdf`;

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
            .then((res) => {
                Alert.alert('Download Selesai', `File disimpan di ${res.path()}`);
            })
            .catch((error) => {
                Alert.alert('Error', 'Gagal mengunduh file');
                console.error(error);
            });
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Lihat File PDF" />
            <Pdf
                trustAllCerts={false}
                source={{ uri: route.params.link, cache: true }}
                onLoadComplete={(numberOfPages) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={{ flex: 1 }}
            />
            <MyButton title="Download PDF" onPress={downloadPDF} />
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