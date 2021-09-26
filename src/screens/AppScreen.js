import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";
import { FAB } from "react-native-elements";
import { TabView, TabBar } from "react-native-tab-view";
import { useDispatch } from "react-redux";
import Activities from "../components/App/Activities";
import Settings from "../components/App/Settings";
import UnitList from "../components/App/UnitList";
import { AdUnit, App } from "../models/app";
import { getUnits } from "../store/actions/units";
import { THEME } from "../theme";

const AppScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const defaultApp = new App();
  let app = route.params ? route.params.app : defaultApp;

  const [changingApp, setChangingApp] = useState(app);

  const changeAppHandler = (app) => {
    setChangingApp(app);
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

  const saveApp = () => {
    console.log(changingApp);
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      renderIcon={(props) => getTabBarIcon(props)}
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
      {app.id ? (
        <View style={styles.actions}>
          <FAB
            title="Save"
            onPress={saveApp}
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
          disabled={!changingApp.name || !changingApp.url}
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
