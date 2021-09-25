import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import { THEME } from '../../theme';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading;
