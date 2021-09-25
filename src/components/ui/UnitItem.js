import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { THEME } from '../../theme';

const UnitItem = ({unit, onOpen}) => {
  
  useEffect(() => {

  }, [])
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(unit)} >
      <View style={styles.item}>
        <Text style={{...styles.text, width: 280}} numberOfLines={1} ellipsizeMode="tail">{unit.name}</Text>
        <Text style={styles.text}>{unit.id}</Text>
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

export default UnitItem;
