import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import { getData } from '../../utils/localStorage';
import { colors, fonts, windowWidth } from '../../utils';

const images = [
  { id: 1, src: require('../../assets/korosel-1.png'), label: 'Gambar 1' },
  { id: 2, src: require('../../assets/koresel-2.png'), label: 'Gambar 2' },
  { id: 3, src: require('../../assets/koresel-3.png'), label: 'Gambar 3' },
];

const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const scrollX = useRef(new Animated.Value(0)).current; // Untuk animasi scroll
  const scrollViewRef = useRef(null); // Untuk mengontrol scroll view
  const [currentIndex, setCurrentIndex] = useState(0);

  const __getUser = () => {
    getData('user').then((u) => {
      setUser(u);
    });
  };

  useEffect(() => {
    __getUser();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % images.length;
  //     scrollViewRef.current.scrollTo({
  //       x: nextIndex * windowWidth,
  //       animated: true,
  //     });
  //     setCurrentIndex(nextIndex);
  //   }, 3000); // Ganti slide setiap 3 detik

  //   return () => clearInterval(interval); // Hentikan interval saat komponen di-unmount
  // }, [currentIndex]);

  return (
    <ImageBackground
      source={require('../../assets/bghome.png')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
      }}
    >
    
        <View style={{ padding: 10 }}>
          {/* Sambutan & nama */}

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:10
          }}>

          <View>
            <Text style={{
              fontFamily:fonts.primary[600],
              fontSize:20,
              color:colors.primary,
            }}>Hi, User</Text>
             <Text style={{
              fontFamily:fonts.primary[600],
              fontSize:20,
              color:colors.primary,
            }}>Aplikasi SiPesat</Text>
          </View>

          <View>
            <Image source={require('../../assets/logohome.png')} style={{
              width:57,
              height:55,
            }}/>
          </View>

          </View>


          {/* MENU */}
          <View style={{
            padding:10,
            marginTop:50
            
          }}>

          <TouchableNativeFeedback onPress={() => navigation.navigate('InfoAplikasi')}>
            <View style={{
              padding:10,
              backgroundColor:colors.white,
              borderRadius:30,
              borderWidth:3,
              borderColor:colors.primary,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:'center'
            }}>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:25,
                color:colors.primary,
              }}>Info Aplikasi</Text>
            </View>

            <View>
              <Image source={require('../../assets/info_icon.png')} style={{
                width:70,
                height:70,
              }}/>
            </View>

            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate('Materi')}>
            <View style={{
              padding:10,
              backgroundColor:colors.white,
              borderRadius:30,
              borderWidth:3,
              borderColor:colors.primary,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:'center',
              marginTop:10
            }}>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:25,
                color:colors.primary,
              }}>Materi</Text>
            </View>

            <View>
              <Image source={require('../../assets/materi_icon.png')} style={{
                width:70,
                height:70,
              }}/>
            </View>

            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate('Regulasi')}>
            <View style={{
              padding:10,
              backgroundColor:colors.white,
              borderRadius:30,
              borderWidth:3,
              borderColor:colors.primary,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:'center',
              marginTop:10
              
            }}>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:25,
                color:colors.primary,
              }}>Regulasi</Text>
            </View>

            <View>
              <Image source={require('../../assets/regulasi_icon.png')} style={{
                width:70,
                height:70,
              }}/>
            </View>

            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate("ProfilPengawas")}>
            <View style={{
              padding:10,
              backgroundColor:colors.white,
              borderRadius:30,
              borderWidth:3,
              borderColor:colors.primary,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:'center',
              marginTop:10
            }}>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:25,
                color:colors.primary,
              }}>Profil Pengawas</Text>
            </View>

            <View>
              <Image source={require('../../assets/profile_pengawas.png')} style={{
                width:70,
                height:70,
              }}/>
            </View>

            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.navigate("Diskusi")}>
            <View style={{
              padding:10,
              backgroundColor:colors.white,
              borderRadius:30,
              borderWidth:3,
              borderColor:colors.primary,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:'center',
              marginTop:10
            }}>

            <View>
              <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:25,
                color:colors.primary,
              }}>Diskusi</Text>
            </View>

            <View>
              <Image source={require('../../assets/diskusi_icon.png')} style={{
                width:70,
                height:70,
              }}/>
            </View>

            </View>
          </TouchableNativeFeedback>

          </View>
       
        </View>
 
    </ImageBackground>
  );
}
