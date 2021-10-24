import React from 'react';
import {Platform} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {HeaderButton} from 'react-navigation-header-buttons'
import { THEME } from '../../theme';

const AppHeaderIcon = props => {
  return (
  <HeaderButton 
    {...props}
    iconSize={props.iconSize ? props.iconSize : 24}
    IconComponent={props.IconComponent || Ionicons}
    color={props.color ? props.color : Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
  />)
  }


export default AppHeaderIcon;