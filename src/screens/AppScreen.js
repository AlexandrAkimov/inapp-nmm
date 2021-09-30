import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import { FAB } from "react-native-elements";
import { TabView, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import Activities from "../components/App/Activities";
import Settings from "../components/App/Settings";
import UnitList from "../components/App/UnitList";
import { AdUnit, App } from "../models/app";
import { getUnits } from "../store/actions/units";
import { saveApp } from "../store/actions/apps";
import { THEME } from "../theme";
import Loading from "../components/ui/Loading";

const AppScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const {colors} = useTheme();
  const defaultApp = new App();
  let app = route.params?.app?.id ? route.params.app : defaultApp;
  const { units } = useSelector((state) => state.units);
  const { localLoading } = useSelector((state) => state.loading);
  const [changingApp, setChangingApp] = useState(app);

  const [valid, setValid] = useState(false)

  const changeAppHandler = (changedApp) => {
    const newApp = Object.assign(app, changedApp)
    setChangingApp(newApp);
    setValid(newApp.name && newApp.url)
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Settings app={app} onChangeApp={changeAppHandler} />;
      case "second":
        return <Activities app={changingApp} />;
      case "third":
        return <UnitList app={changingApp} navigation={navigation} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);

  const [routes] = useState(
    app.id
      ? [
          { key: "first", title: "Settings" },
          { key: "second", title: "Activities" },
          { key: "third", title: "Ad Units" },
        ]
      : [{ key: "first", title: "Settings" }]
  );

  useEffect(() => {
    if (app.id) {
      dispatch(getUnits(app.id))
    }
    console.log('init');
  }, []);

  const layout = useWindowDimensions();

  const getTabBarIcon = (props) => {
    const { route } = props;
    switch (route.key) {
      case "first":
        return <Ionicons name="settings" size={25} color={"#fff"} />;
      case "second":
        return <Feather name="activity" size={24} color="#fff" />;
      case "third":
        return <MaterialIcons name="ad-units" size={24} color="#fff" />;
      default:
        return null;
    }
  };

  const save = async () => {
    if (!units.length) {
      return
    }
    dispatch(saveApp({
      app: changingApp,
      adUnits: units,
      activities: [],
      selectActivities: [[]]
    }))
    navigation.setParams('App', {app: changingApp})
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      renderIcon={(props) => getTabBarIcon(props)}
      style={ { backgroundColor: colors.card  }}
    />
  );

  return (
    localLoading ? <Loading /> : <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy
      />
      {app.id ? (
        <View style={styles.actions}>
          <FAB
            title="Save"
            onPress={save}
            color={THEME.MAIN_COLOR}
            buttonStyle={{ width: 150 }}
            containerStyle={{ margin: 10 }}
            icon={() => <FontAwesome name="save" color="#fff" size={24} />}
            iconRight={true}
          />
          {index === 2 ? (
            <FAB
              title="Add Ad Unit"
              onPress={() => navigation.navigate('Unit', {app: changingApp, unit: new AdUnit()})}
              color={THEME.MAIN_COLOR}
              buttonStyle={{ width: 150 }}
              containerStyle={{ margin: 10 }}
              icon={() => <Ionicons name="add" color="#fff" size={24} />}
              iconRight={true}
            />
          ) : null}
        </View>
      ) : (
        <FAB
          title="Add Ad Unit"
          onPress={() => navigation.navigate('Unit', {app: changingApp, unit: new AdUnit()})}
          disabled={!valid}
          color={THEME.MAIN_COLOR}
          buttonStyle={{ width: 200 }}
          containerStyle={{ margin: 10 }}
          icon={() => <Ionicons name="add" color="#fff" size={24} />}
          iconRight={true}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: { 
    flexDirection: "row", 
    justifyContent: "space-around" 
  }
});

export default AppScreen;
