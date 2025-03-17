import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import {Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../utils';


export default function MyTimePicker({
  label,
  iconname = 'time-outline', // Ikon yang sesuai
  onTimeChange = () => {}, // Fallback fungsi
  value,
}) {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(value || null); // Default null jika tidak ada value

  const onChange = (event, selectedTime) => {
    setShow(false);
    if (selectedTime) {
      setTime(selectedTime);
      onTimeChange(selectedTime);
    }
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity onPress={showTimepicker} style={styles.timePicker}>
        <TextInput
          style={styles.timeText}
          editable={false}
          placeholder="Pilih Waktu"
          placeholderTextColor="#A0A0A0" // Warna placeholder abu-abu terang
          value={time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
        />
        <Icon type="ionicon" name={iconname} color="#A0A0A0" size={24} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop:10

  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8, // Sudut membulat
    borderColor: '#D3D3D3', // Border abu-abu terang
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 50,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
