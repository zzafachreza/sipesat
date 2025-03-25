import { View, Text, ScrollView, StyleSheet, Image, Alert, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton, MyHeader } from '../../components'
import axios from 'axios';
import { apiURL, getData, MYAPP, webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
import { showMessage } from 'react-native-flash-message';

export default function PengumumanDetail({ navigation, route }) {
  const item = route.params;
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // State untuk modal

  useEffect(() => {
    getData('user').then(res => setUser(res));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Pengumuman Detail" />
      <ScrollView>

        {/* Klik gambar untuk membuka modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={{ width: '100%', height: 220 }}
            source={{ uri: webURL + item.gambar }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={{ padding: 10 }}>
          <RenderHTML
            tagsStyles={{
              div: {
                fontFamily: fonts.body3.fontFamily,
                fontSize: 12,
                textAlign: 'justify',
                lineHeight: 20,
                color: colors.black,
              },
              p: {
                fontFamily: fonts.body3.fontFamily,
                fontSize: 12,
                textAlign: 'justify',
                lineHeight: 20,
                color: colors.black,
              },
            }}
            systemFonts={[fonts.body3.fontFamily]}
            contentWidth={windowWidth}
            source={{ html: item.keterangan }}
          />
        </View>
      </ScrollView>

      {/* Modal untuk tampilan gambar penuh */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Image
            style={styles.fullImage}
            source={{ uri: webURL + item.gambar }}
            resizeMode="contain"
          />
        </View>
      </Modal>

      {user.role === 'Pengawas Sekolah' && (
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <MyButton title="Edit" onPress={() => navigation.navigate('ShowWeb', {
              link: webURL + 'pengumuman/edit/' + item.id_pengumuman,
              judul: 'Edit Pengumuman'
            })} />
          </View>
          <View style={{ flex: 1 }}>
            <MyButton
              title="Hapus"
              onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                { text: 'TIDAK' },
                {
                  text: 'HAPUS',
                  onPress: () => {
                    axios.post(apiURL + 'delete_data', {
                      modul: 'pengumuman',
                      id: item.id_pengumuman,
                    }).then(res => {
                      if (res.data.status === 200) {
                        showMessage({
                          type: 'success',
                          message: res.data.message
                        });
                        navigation.goBack();
                      }
                    });
                  }
                }
              ])}
              warna={colors.danger}
            />
          </View>
        </View>
      )}
    </View>
  )
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
    alignItems: 'center'
  },
  closeText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain'
  },
});
