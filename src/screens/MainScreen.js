import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { loadList } from '../api/apps';
import AppItem from '../components/ui/AppItem';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';
import AppFilters from '../components/ui/AppFilters';
import { setLoading } from '../store/actions/loading';
import { loadApps } from '../store/actions/apps';

const MainScreen = ({ navigation, route }) => {

  const {apps} = useSelector(state => state.apps)

  const [isFilters, setIsFilters] = useState(false)
  const [appFilterInput, setAppFilterInput] = useState('')

  const toggleFilters = () => {
    setIsFilters(prev => prev = !prev)
  }

  const goToApp = app => {
    navigation.navigate('App', { app })
  }

  const dispatch = useDispatch()

  const findAppHandler = (appName) => {
    setAppFilterInput(appName)
  }

  const clearFindHandler = () => setAppFilterInput('')

  useEffect(() => {
    console.log('mainscreen');
    dispatch(loadApps())
  }, [dispatch])

  useEffect(() => {
    navigation.setParams({toggleFilters})
  }, [])

  const scrollX = useRef(new Animated.Value(0)).current;
  const shown = new Animated.Value(0);
  Animated.timing(shown, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true
  }).start();

  return (
    <View style={styles.wrapper}>
      {isFilters ? 
        <Animated.View style={{ opacity: shown, ...styles.filters }}>
          <AppFilters onFind={findAppHandler} onClear={clearFindHandler}/>
        </Animated.View>
        : null
      }
      
      <FlatList
        style={styles.list}
        data={apps.filter(a => a.name.toLowerCase().includes(appFilterInput.toLowerCase()))}
        keyExtractor={app => app.id}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        pagingEnabled
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        renderItem={({ item }) => <AppItem app={item} onOpen={goToApp} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  list: {
    flex: 1,
    width: '100%'
  },
  filters: {
    width: '100%',
    backgroundColor: THEME.TETRIARY_COLOR,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  },
  filterButton: {
    justifyContent: 'center',
    width: 50,
    height: 50,
  }
})

export default MainScreen;
