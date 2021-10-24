import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import * as NMSDK from "react-native-next-millennium";
import { useTheme } from '@react-navigation/native';
import AppItem from '../components/ui/AppItem';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../theme';
import AppFilters from '../components/ui/AppFilters';
import { loadApps } from '../store/actions/apps';

NMSDK.setup({
  apiKey: "ee443e08-4621-4c2c-9205-dcc9e6bd0685",
  appName: "SimpleSETSS",
  disableWarnings: true          // default is false
});

const MainScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
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
    <View style={{...styles.wrapper, backgroundColor: colors.background}}>
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
    backgroundColor: THEME.TETRIARY_DARKEN_COLOR
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

export default NMSDK.withNMAdsEnabled(MainScreen);
