import React, { useState } from 'react';
import { View, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, Pressable, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { THEME } from '../../theme';

const AppFilters = ({ onFind, onClear }) => {
  const [appName, setAppName] = useState('')
  const [unitId, setUnitId] = useState('')
  const [rippleColor, setRippleColor] = useState('#000');
  const [rippleOverflow, setRippleOverflow] = useState(false);

  const clearHandler = () => {
    setAppName('')
    onClear()
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Input
          label="Find by app name"
          onChangeText={setAppName}
          value={appName}
          renderErrorMessage={true}
          placeholder='Enter app name or app id'
          leftIcon={{ type: 'ionicon', name: 'search', color: 'gray' }}
        />
        <Input
          keyboardType="number-pad"
          label="Find app by unit id"
          value={unitId}
          onChangeText={setUnitId}
          renderErrorMessage={true}
          placeholder='Enter unit id'
          leftIcon={{ type: 'ionicon', name: 'search', color: 'gray' }}
        />

        <View style={styles.actions}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
          >
            <View style={{ width: 150 }}>
              <Button title="Find" color={THEME.MAIN_COLOR} onPress={() => onFind(appName)} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
          >
            <View style={{ width: 150 }}>
              <Button title="Clear" color={THEME.TETRIARY_DARKEN_COLOR} onPress={clearHandler} />
            </View>
          </TouchableNativeFeedback>
        </View>

      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  actions: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  }
})

export default AppFilters;
