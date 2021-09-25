import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ReportsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Reports</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ReportsScreen;