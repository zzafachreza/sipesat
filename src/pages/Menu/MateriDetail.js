import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton, MyHeader } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
export default function MateriDetail({ navigation, route }) {
    const item = route.params;
    console.log(item)
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Materi Detail" />
            <ScrollView>
                <Image style={{
                    width: '100%',
                    height: 220,
                }} source={{
                    uri: webURL + item.gambar
                }} />

                <View style={{
                    padding: 10,
                }}>


                    {item.link_materi.length > 0 &&

                        <MyButton onPress={() => navigation.navigate('ShowWeb', {
                            link: item.link_materi
                        })} title="Lihat Link Video / Web" />

                    }


                    {item.pdf_materi.length > 0 &&

                        <MyButton onPress={() => navigation.navigate('ShowPDF', {
                            link: webURL + item.pdf_materi
                        })} warna={colors.danger} title="Lihat File PDF" />

                    }

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
                        source={{
                            html: item.artikel
                        }}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})