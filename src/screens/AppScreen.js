import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Activities from '../components/App/Activities';
import Settings from '../components/App/Settings';
import UnitList from '../components/App/UnitList';
import { THEME } from '../theme';


const AppScreen = ({ navigation, route }) => {
  let app = route.params ? route.params.app : {};

  const [changingApp, setChangingApp] = useState(app)

  const changeAppHandler = app => {
    setChangingApp(app)
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Settings app={app} onChangeApp={changeAppHandler}/>;
      case 'second':
        return <Activities />;
      case 'third':
        return <UnitList app={changingApp} navigation={navigation} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);

  const [routes] = useState(app.id ? [
    { key: 'first', title: 'Settings' },
    { key: 'second', title: 'Activities' },
    { key: 'third', title: 'Ad Units' },
  ] : [
    { key: 'first', title: 'Settings' },
    { key: 'third', title: 'Ad Units' }
  ]);


  useEffect(() => {
    navigation.setParams({ app })
  }, [])

  const layout = useWindowDimensions();

  const getTabBarIcon = (props) => {
    const {route} = props
    switch (route.key) {
      case 'first':
        return <Ionicons name="settings" size={25} color={'#fff'} />;
      case 'second':
        return <Feather name="activity" size={24} color="#fff" />;
      case 'third':
        return <MaterialIcons name="ad-units" size={24} color="#fff" />;
      default:
        return null;
    }

}

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      renderIcon={props => getTabBarIcon(props)}
      style={{ backgroundColor: THEME.MAIN_COLOR }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      lazy
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AppScreen;