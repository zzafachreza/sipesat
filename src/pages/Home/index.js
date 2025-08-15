import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import {getData} from '../../utils/localStorage';
import {colors, fonts} from '../../utils';

export default function Home({navigation}) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u);
    });
  };

  useEffect(() => {
    __getUser();
  }, []);

  const MenuItem = ({title, icon, onPress}) => (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.menuItem}>
        <Image
          source={require('../../assets/efek.png')}
          style={{
            // width: 100,
            right: -10,
            height: '100%',
            position: 'absolute',
          }}
        />
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.menuText}>{title}</Text>
          <Image source={icon} style={styles.menuIcon} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  return (
    <ImageBackground
      source={require('../../assets/bghome.png')}
      style={styles.background}>
      <View style={styles.container}>
        {/* Sambutan & nama */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {user?.nama || 'User'}</Text>
            <Text style={styles.appName}>Aplikasi SiPesat</Text>
          </View>
          <Image
            source={require('../../assets/logohome.png')}
            style={styles.logo}
          />
        </View>

        {/* Menu */}
        <View style={styles.menuWrapper}>
          <MenuItem
            title="Info Aplikasi"
            icon={require('../../assets/info_icon.png')}
            onPress={() => navigation.navigate('InfoAplikasi')}
          />
          <MenuItem
            title="Materi"
            icon={require('../../assets/materi_icon.png')}
            onPress={() => navigation.navigate('Materi')}
          />
          <MenuItem
            title="Regulasi"
            icon={require('../../assets/regulasi_icon.png')}
            onPress={() => navigation.navigate('Regulasi')}
          />
          <MenuItem
            title="Profil Pengawas"
            icon={require('../../assets/profile_pengawas.png')}
            onPress={() => navigation.navigate('ProfilPengawas')}
          />
          <MenuItem
            title="Diskusi"
            icon={require('../../assets/diskusi_icon.png')}
            onPress={() => navigation.navigate('Diskusi')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  greeting: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.primary,
  },
  appName: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.primary,
  },
  logo: {
    width: 57,
    height: 55,
  },
  menuWrapper: {
    padding: 10,
  },
  menuItem: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  menuText: {
    flex: 1,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.primary,
  },
  menuIcon: {
    width: 65,
    height: 65,
  },
});
