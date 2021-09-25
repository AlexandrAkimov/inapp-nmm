import axios from'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../navigation/RootNavigation';


const instance = axios.create()

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers['token'] = token
    config.headers['Content-Type'] = 'application/json'
  }
  return config;
});

instance.interceptors.response.use(response => response, async error => {
  if (!error.response) return
  if (error.response.status === 401) {
    console.error('Error: Anauthorized!');
    RootNavigation.navigate('Login');
    await AsyncStorage.clear()
  } 
  return Promise.reject(error);
});

export default instance;