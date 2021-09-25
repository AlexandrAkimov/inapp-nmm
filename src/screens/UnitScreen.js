import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-elements';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Settings from '../components/Unit/Settings';
import Demand from '../components/Unit/Demand';
import Admob from '../components/Unit/Admob';
import GeoTargeting from '../components/Unit/GeoTargeting';
import { THEME } from '../theme';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';


const UnitScreen = ({ navigation, route }) => {
  const [open, setOpen] = useState(false)
  const name = route.params.unit.id ? route.params.unit.name : 'Add new unit'
  const app = route.params.app
  const unit = route.params.unit

  let actualUnit = unit

  const onChangeUnitHandler = (name, ad_unit_path) => {
    actualUnit = {
      name, ad_unit_path: ad_unit_path
    }
  }

  const saveApp = () => {
    console.log(actualUnit);
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Settings app={app} unit={unit} onChangeUnit={onChangeUnitHandler} />;
      case 'second':
        return <Demand app={app} />;
      case 'third':
        return <Admob app={app} />;
      case 'four':
        return <GeoTargeting app={app} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Settings' },
    { key: 'second', title: 'Demand' },
    { key: 'third', title: 'Admob' },
    { key: 'four', title: 'Geo' },
  ]);


  useEffect(() => {
    navigation.setParams({ app, unit })
  }, [])

  const layout = useWindowDimensions();

  const getTabBarIcon = (props) => {
    const { route } = props
    switch (route.key) {
      case 'first':
        return <Ionicons name="settings" size={25} color={'#fff'} />;
      case 'second':
        return <MaterialIcons name="mobile-friendly" size={24} color="#fff" />;
      case 'third':
        return <Ionicons name="resize" size={25} color={'#fff'} />;
      case 'four':
        return <Ionicons name="earth" size={25} color={'#fff'} />;
      default:
        return null;
    }

  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderIcon={(props) => getTabBarIcon(props)}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: THEME.MAIN_COLOR }}
    />
  );

  return (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy
      />

      <FAB 
        title="Save" 
        onPress={saveApp}
        color={THEME.MAIN_COLOR} 
        buttonStyle={{width: 150}}
        containerStyle={{margin: 10}} 
        icon={() => <FontAwesome name="save" color="#fff" size={24} />}
        iconRight={true}
      />
    </>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UnitScreen;