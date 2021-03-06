import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@react-navigation/native';
import { FAB } from "react-native-elements";
import { useWindowDimensions, StyleSheet, Button } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Settings from "../components/Unit/Settings";
import Demand from "../components/Unit/Demand";
import Admob from "../components/Unit/Admob";
import GeoTargeting from "../components/Unit/GeoTargeting";
import Loading from "../components/ui/Loading";
import { THEME } from "../theme";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AdUnit } from "../models/app";
import { saveApp } from "../store/actions/apps";

const UnitScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();
  //const [selectActivities, setSelectActivities] = useState([[]])
  const defaultUnit = new AdUnit();
  const app = route.params.app;
  const unit = route.params.unit.id ? route.params.unit : defaultUnit;

  const { units } = useSelector((state) => state.units);
  //const {activities} = useSelector(state => state.activities)
  const localLoading = useSelector((state) => state.loading.localLoading);

  const [actualUnit, setActualUnit] = useState(unit);

  const onChangeUnitHandler = (unit) => {
    setActualUnit(unit);
  };

  const save = () => {
    dispatch(
      saveApp({
        app,
        adUnits: app.id ? [...units, actualUnit] : [actualUnit],
        activities: [],
        selectActivities: [[]],
      })
    );
  };

  useEffect(() => {
    navigation.setParams({save});
  }, [])
  

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Settings
            app={app}
            unit={unit}
            onChangeUnit={onChangeUnitHandler}
            actualUnit={actualUnit}
          />
        );
      case "second":
        return (
          <Demand
            app={app}
            unit={unit}
            onChangeUnit={onChangeUnitHandler}
            actualUnit={actualUnit}
          />
        );
      case "third":
        return (
          <Admob
            app={app}
            unit={unit}
            onChangeUnit={onChangeUnitHandler}
            actualUnit={actualUnit}
          />
        );
      case "four":
        return <GeoTargeting app={app} unit={unit} actualUnit={actualUnit} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Settings" },
    { key: "second", title: "Demand" },
    { key: "third", title: "Admob" },
    { key: "four", title: "Geo" },
  ]);

  useEffect(() => {}, [actualUnit]);

  useEffect(() => {
  }, []);

  const layout = useWindowDimensions();

  const getTabBarIcon = (props) => {
    const { route } = props;
    switch (route.key) {
      case "first":
        return <Ionicons name="settings" size={25} color={"#fff"} />;
      case "second":
        return <MaterialIcons name="mobile-friendly" size={24} color="#fff" />;
      case "third":
        return <Ionicons name="resize" size={25} color={"#fff"} />;
      case "four":
        return <Ionicons name="earth" size={25} color={"#fff"} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderIcon={(props) => getTabBarIcon(props)}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: colors.card }}
    />
  );

  return localLoading ? (
    <Loading />
  ) : (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy
      />

    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UnitScreen;
