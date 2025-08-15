import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Alert,
  Pressable,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts} from '../../utils';
import {MyInput} from '../../components';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {apiURL, storeData} from '../../utils/localStorage';

export default function Login({navigation}) {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    if (data.username.length == '' || data.password.length == '') {
      showMessage({
        type: 'danger',
        backgroundColor: colors.danger,
        color: colors.white,
        message: 'Semua Field Harus Diisi!',
        position: 'top',
        style: {borderBottomRightRadius: 10, borderBottomLeftRadius: 10},
        textStyle: {fontFamily: fonts.primary[600]},
      });
    } else if (data.username.length == '') {
      showMessage({
        type: 'danger',
        backgroundColor: colors.danger,
        color: colors.white,
        message: 'Email Harus Diisi!',
        position: 'top',
        style: {borderBottomRightRadius: 10, borderBottomLeftRadius: 10},
        textStyle: {fontFamily: fonts.primary[600]},
      });
    } else if (data.password.length == '') {
      showMessage({
        type: 'danger',
        backgroundColor: colors.white,
        color: colors.danger,
        message: 'Password Harus Diisi!',
      });
    } else {
      console.log('Data yang dikirim: ', data);

      axios
        .post(apiURL + 'login', data)
        .then(res => {
          if (res.data.status == 200) {
            showMessage({
              type: 'success',
              backgroundColor: colors.white,
              color: colors.success,
              message: res.data.message,
            });
            storeData('user', res.data.data);

            if (res.data.data.role == 'Pengawas Sekolah') {
              navigation.replace('PengawasMainApp');
            } else {
              navigation.replace('GuruMainApp');
            }
          } else {
            showMessage({
              type: 'danger',
              backgroundColor: colors.white,
              color: colors.danger,
              message: res.data.message,
            });
          }
        })
        .catch(err => {
          console.error('Error: ', err);
        });
    }
  };

  const [comp, setComp] = useState({});
  useEffect(() => {
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data[0]);
    });
  }, []);

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
      source={require('../../assets/bglogin.png')}>
      <ScrollView>
        <View
          style={{
            padding: 10,
          }}>
          <View>
            <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 227,
                height: 294,
                marginTop: 20,
                alignSelf: 'center',
              }}
            />
          </View>

          <View
            style={{
              marginTop: '10%',
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                color: 'white',
                fontSize: 25,
                textAlign: 'center',
              }}>
              Masuk
            </Text>

            <View
              style={{
                padding: 10,
              }}>
              <MyInput
                value={data.username}
                label="Username"
                placeholder="Isi Username"
                colorlabel="white"
                onChangeText={x => setData({...data, username: x})}
              />

              <MyInput
                label="Kata Sandi"
                placeholder="Isi Kata Sandi"
                colorlabel="white"
                secureTextEntry={true}
                value={data.password}
                onChangeText={x => setData({...data, password: x})}
              />

              <View>
                <TouchableNativeFeedback onPress={handleLogin}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: colors.button,
                      borderRadius: 30,
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: colors.white,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.primary[600],
                        color: colors.primary,
                        textAlign: 'center',
                      }}>
                      Masuk
                    </Text>
                  </View>
                </TouchableNativeFeedback>

                <View
                  style={{
                    marginTop: 30,
                  }}>
                  <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        color: '#D7F0EA',
                        textAlign: 'center',
                        marginTop: 10,
                        fontSize: 12,
                      }}>
                      Belum memiliki akun? Silakan{' '}
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          color: colors.white,
                        }}>
                        Daftar
                      </Text>
                    </Text>
                  </Pressable>

                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        console.log(comp);
                        Linking.openURL(
                          'https://wa.me/' +
                            comp.tlp +
                            '?text=Halo Admin Saya lupa password . . ',
                        );
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.primary[600],
                            color: 'white',
                            fontSize: 12,
                          }}>
                          Lupa Kata Sandi
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
