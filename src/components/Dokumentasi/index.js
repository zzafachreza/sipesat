import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { fonts } from '../../utils';
import { Icon } from 'react-native-elements';

export default function Dokumentasi() {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    const options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <View style={styles.iconContainer}>
         <Icon type='ionicon' name='cloud-upload' color="#C0C0C0"/>
        </View>
        <Text style={styles.buttonText}>Tambah Dokumentasi</Text>
      </TouchableOpacity>
      {image && <Image source={image} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft:-10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007BFF',
    width: 300,
    height: 100,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    fontSize: 24,
    color: '#C0C0C0',
  },
  buttonText: {
    color: '#C0C0C0',
    fontSize: 16,
    fontFamily:fonts.primary[500],
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
