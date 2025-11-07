import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, colors, fonts, windowWidth} from '../../utils';
import {MyHeader} from '../../components';
import {Icon} from 'react-native-elements';
import {apiURL, getData, webURL} from '../../utils/localStorage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
export default function AgendaPengawas({navigation, route}) {
  const user = route.params;
  const [data, setData] = useState([]);
  const [markedDates, setMarketDates] = useState({});
  const __getDataBaseAPI = () => {
    getData('user').then(u => {
      axios
        .post(apiURL + 'agenda', {
          fid_pengguna: u.id_pengguna,
        })
        .then(res => {
          setData(res.data);

          let tmp = res.data.reduce((acc, item) => {
            acc[item.tanggal] = {selected: true, selectedColor: colors.primary};
            return acc;
          }, {});

          console.log(tmp);
          setMarketDates(tmp);
        });
    });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      __getDataBaseAPI();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MyHeader title="Agenda Pengawas" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}>
        <Calendar
          // Customize the appearance of the calendar
          style={{
            borderWidth: 1,
            borderColor: Color.blueGray[200],

            marginBottom: 10,
          }}
          // Specify the current date
          current={moment().format('YYYY-MM-DD')}
          // Callback that gets called when the user selects a day
          onDayPress={day => {
            let tt = [...data];
            let cek = tt.filter(i => i.tanggal == day.dateString).length;

            if (cek > 0) {
              let filtered = tt.filter(i => i.tanggal == day.dateString)[0];
              console.log(filtered);
              Alert.alert(
                filtered.judul,
                `${filtered.keterangan}\nTanggal : ${filtered.tanggal}\nWaktu : ${filtered.jam_mulai} - ${filtered.jam_selesai}`,
              );
            }
          }}
          // Mark specific dates as marked
          markedDates={markedDates}
        />

        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => navigation.navigate('AgendaDetail', item)}>
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
                    {moment(item.tanggal_buat).format('DD MMMM YYYY')}
                  </Text>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Judul
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      : {item.judul}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Tanggal
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      : {moment(item.tanggal).format('dddd,DD MMMM YYYY')}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Waktu
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      : {item.jam_mulai.toString().substr(0, 5)} -{' '}
                      {item.jam_selesai.toString().substr(0, 5)} WIB
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 15}}>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.text,
                        width: '40%',
                      }}>
                      Keterangan
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.primary[500],
                        fontSize: 10,
                        color: colors.primary,
                      }}>
                      : {item.keterangan}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <View>
        {user.role == 'Pengawas Sekolah' && (
          <Pressable
            onPress={() =>
              navigation.navigate('ShowWeb', {
                link: webURL + 'agenda/add',
                judul: 'Tambah Agenda Pengawas',
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
        )}
      </View>
    </View>
  );
}
