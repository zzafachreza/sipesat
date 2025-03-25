import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  StatusGizi,
  Imt,
  Take,
  StatusGiziHasil,
  DataIbuHamil,
  DataPemeriksaanIbuHami,
  SubDataPemeriksaanIbuHami,
  IbuHamil,
  TrisemesterI,
  TrisemesterII1,
  TrisemesterIII1,
  TrisemesterIII2,
  TrisemesterIII3,
  IbuBersalin,
  IbuNifas,
  IbuNifasKF,
  VideoMateri,
  TanyaJawab,
  Artikel,
  Kuesioner,
  TrisemesterII2,
  InfoLayananKesehatan,
  InfoEdukasiPenyakit,
  InfoEdukasiPenyakitKanker,
  InfoEdukasiPenyakitStroke,
  InfoEdukasiPenyakitJantung,
  InfoEdukasiPenyakitGinjal,
  InfoEdukasiPenyakitDiabetes,
  InteraksiBersamaTim,
  TentangAplikasi,
  InfoEdukasiPenyakitStunting,
  PrintKainRoll,
  PrintJersey,
  CetakSample,
  CetakSampleKainRoll,
  CetakSampleHijab,
  CetakSampleJersey,
  PrintHijab,
  Riwayat,
  MulaiPage,
  Indentitas,
  HasilTekananDarah,
  SubRiwayatPemeriksaanLaboratorium,
  Gula,
  ProfilLipid,
  LainLain,
  RiwayatPemeriksaanRadiologis,
  RiwayatObat,
  EKG,
  PenilaianNyeri,
  Rekomendasi,
  KalkulatorKompos,
  Petunjuk,
  CheckHargaStock,
  BuatPenawaran,
  TambahPenawaran,
  DonwnloadBrosur,
  BuktiPengeluaran,
  TambahBuktiPengeluaran,
  HasilBuatPenawaran,
  InfoAplikasi,
  Materi,
  Regulasi,
  ProfilPengawas,
  Diskusi,
  PilihPengawas,
  AgendaPengawas,
  Meeting,
  PengumumanDetail,
  TanyaPengawas,
  HomePengawas,
  ProfileGuru,
  BukuKunjungan,
  TambahBukuKunjungan,
  MeetingPengawas,
  TambahMeeting,
  MateriDetail,
  ShowWeb,
  ShowPDF,
  MeetingDetail,
  KunjunganDetail,
  AgendaDetail,



} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator, GuruBottomNavigator, PengawasBottomNavigator } from '../components';
import HomeGuru from '../pages/HomeGuru';
import PendampinganKomunitas from '../pages/Menu/pendemping';
import PedampinganDetail from '../pages/Menu/pendampingdetail';
import Pengumuman from '../pages/Menu/pengumuman';



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Splash' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Account} />

    </Tab.Navigator>
  );
};

const GuruMainApp = () => {
  return (
    <Tab.Navigator initialRouteName='HomeGuru' tabBar={props => <GuruBottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="HomeGuru" component={HomeGuru} />
      <Tab.Screen name="TanyaPengawas" component={TanyaPengawas} />
      <Tab.Screen name="Profile" component={Account} />

    </Tab.Navigator>
  );
};

const PengawasMainApp = () => {
  return (
    <Tab.Navigator initialRouteName='HomePengawas' tabBar={props => <PengawasBottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="HomePengawas" component={HomePengawas} />
      <Tab.Screen name="Profile" component={Account} />

    </Tab.Navigator>
  );
};




export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MateriDetail"
        component={MateriDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ShowWeb"
        component={ShowWeb}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ShowPDF"
        component={ShowPDF}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AgendaDetail"
        component={AgendaDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="KunjunganDetail"
        component={KunjunganDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MeetingDetail"
        component={MeetingDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MeetingPengawas"
        component={MeetingPengawas}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TambahMeeting"
        component={TambahMeeting}
        options={{
          headerShown: false,

        }}
      />





      <Stack.Screen
        name="GuruMainApp"
        component={GuruMainApp}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="BukuKunjugan"
        component={BukuKunjungan}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TambahBukuKunjungan"
        component={TambahBukuKunjungan}
        options={{
          headerShown: false,

        }}
      />




      <Stack.Screen
        name="PengawasMainApp"
        component={PengawasMainApp}
        options={{
          headerShown: false,

        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="InfoAplikasi"
        component={InfoAplikasi}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Materi"
        component={Materi}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Regulasi"
        component={Regulasi}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="ProfilPengawas"
        component={ProfilPengawas}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Diskusi"
        component={Diskusi}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="PilihPengawas"
        component={PilihPengawas}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="AgendaPengawas"
        component={AgendaPengawas}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="PedampinganKomunitas"
        component={PendampinganKomunitas}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Meeting"
        component={Meeting}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Pengumuman"
        component={Pengumuman}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="PengumumanDetail"
        component={PengumumanDetail}
        options={{
          headerShown: false,

        }}
      />






      <Stack.Screen
        name="PedampinganDetail"
        component={PedampinganDetail}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="TanyaPengawas"
        component={TanyaPengawas}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="ProfileGuru"
        component={ProfileGuru}
        options={{
          headerShown: false,

        }}
      />






      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="CheckHargaStock"
        component={CheckHargaStock}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="KalkulatorKompos"
        component={KalkulatorKompos}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Petunjuk"
        component={Petunjuk}
        options={{
          headerShown: false,

        }}
      />





      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />
















    </Stack.Navigator>
  );
}
