import React, { useState, useEffect } from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Button} from 'react-native';
import { Input } from 'react-native-elements';
import {Alert} from 'react-native'
import axios from '../api/axios'
import base from '../api/base-url'

import { THEME } from '../theme';
import { useDispatch } from 'react-redux';

const LoginScreen = ({navigation, route}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = async () => {
    const response = await axios.post(base.url + 'api-ui/signin', {email, password})
    if (!response.data.success) {
      return ToastAndroid.show('Incorrect email or password', ToastAndroid.SHORT);
    }
    dispatch({type: 'LOGIN'});
    await AsyncStorage.setItem('token', response.data.token)
    navigation.push('Apps');
  }

  const backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }
 
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Input
          label="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          renderErrorMessage={true}
          style={styles.input}
          placeholder='Enter email please'
          leftIcon={{ type: 'ionicon', name: 'mail', color: 'gray'}}
        />
        <Input
          onChangeText={setPassword}
          label="Password"
          secureTextEntry={true}
          placeholder='Enter password please'
          leftIcon={{ type: 'ionicon', name: 'key', color: 'gray'}}
        />
        <Button title="Log In" onPress={login} color={THEME.MAIN_COLOR}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#0ea77a'
  },
  card: {
    justifyContent: 'space-between',
    backgroundColor: THEME.TETRIARY_COLOR,
    width: '100%',
    height: 300,
    borderRadius: 10,
    padding: 15,
  },

})

export default LoginScreen;