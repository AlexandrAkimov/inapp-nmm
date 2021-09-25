import React from 'react'
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainScreen from '../../screens/MainScreen';
import UnitScreen from '../../screens/UnitScreen';
import AppHeaderIcon from '../../components/ui/AppHeaderIcon';
import AppScreen from '../../screens/AppScreen';
import LoginScreen from '../../screens/LoginScreen';

export const stackConfig = [
  {
    name: "MainApp",
    component: MainScreen,
    options: (navigation, route) => {
      
      return({
        title: 'Apps',
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="add-filter" iconName="filter" iconSize={30} onPress={route.params ? route.params.toggleFilters : null}/>
            <Item title="add-circle" iconName="add" iconSize={30} onPress={() => navigation.navigate('App', {app: {}})}/>
          </HeaderButtons>
        ),
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="menu" iconName="menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          </HeaderButtons>
        )
      })
    }
  },
  {
    name: "App",
    component: AppScreen,
    options: (navigation, route) => {
      return ({
      title: route.params.app.name ? route.params.app.name : 'Add new app',
    })}
  },
  {
    name: "Unit",
    component: UnitScreen,
    options: (navigation, route) => {
      return ({
      title: route.params.unit.name ? route.params.unit.name : 'Add new ad unit',
      // headerRight: () => (
        
      //   <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      //     <Item title="booked" iconName={'star-outline'} />
      //   </HeaderButtons>
      // )
    })}
  }
]