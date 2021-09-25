import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadAppInfo } from '../../api/appstore';
import { THEME } from '../../theme';

const AppItem = ({app, onOpen}) => {
  const [appInfo, setAppInfo] = useState({icon: 'https://www.innovatec.com/templates/innovatec.nl/UserFiles/Image/Algemeen/75.Iconen/IconenInnovatec/iconminimumcomponents.png'})
  async function getAppInfo() {
    const platform = app.url.split('.')[0]
    let id
    if (platform === 'https://play') {
      id = app.url.split('?id=')[1];
      id = id.split('&')[0]
    } else if (platform === 'https://apps') {
      id = app.url.split('/id')[1];
    } else {
      return
    }

    try {
      const info = await loadAppInfo(id, platform)
      if (info) {
        setAppInfo(info)
      }
      
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    getAppInfo()
  }, [])
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(app)} >
      <View style={styles.item}>
        <Image 
          resizeMode="contain"
          source={{uri: appInfo.icon}}
          style={{width: 40, height: 50, borderRadius: 10}}/>
        <Text style={{...styles.text, width: 280}} numberOfLines={1} ellipsizeMode="tail">{app.name}</Text>
        <Text style={styles.text}>{app.id}</Text>
      </View>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: THEME.TETRIARY_COLOR
  },
  text: {
    color: '#0E1821',
    
  }
})

export default AppItem;
