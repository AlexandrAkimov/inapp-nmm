import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, View, ScrollView, Text, Keyboard } from "react-native";
import { Switch, BottomSheet, ListItem, Input } from "react-native-elements";
import { THEME } from "../../theme";
import Select from "../ui/Select";

const Admob = ({ app, unit, navigation, onChangeUnit, actualUnit }) => {
  const [adUnitPath, setAdUnitPath] = useState(unit.admob_ad_unit_path);
  const [admobEnable, setAdmobEnable] = useState(unit.admob_enable);
  const [type, setType] = useState(unit.type);
  const [sizes, setSizes] = useState(unit.sizes);
  const [nativeSize, setNativeSize] = useState(unit.admob_native_size);

  const bannerSizeList = [
    { title: "1x1", field: "1x1" },
    { title: "160x160", field: "160x160" },
    { title: "300x250", field: "300x250" },
    { title: "300x600", field: "300x600" },
    { title: "320x50", field: "320x50" },
    { title: "320x100", field: "320x100" },
    { title: "970x90", field: "970x90" },
    { title: "970x250", field: "970x250" },
    {
      title: "Cancel",
      titleStyle: { color: "tomato" },
      onPress: () => setIsVisible(false),
    },
  ];

  const bannerTypeList = [
    { title: "Banner", field: 1 },
    { title: "Native", field: 3 },

    {
      title: "Cancel",
      titleStyle: { color: "tomato" },
      onPress: () => setIsVisible(false),
    },
  ];

  const nativeSizeList = [
    { title: "Small", field: "small" },
    { title: "Medium", field: "medium" },
    {
      title: "Cancel",
      titleStyle: { color: "tomato" },
      onPress: () => setIsVisible(false),
    },
  ];

  const onSelect = (value, unitField) => {
    switch (unitField) {
      case "type":
        setType(value);
        break;
      case "sizes":
        setSizes(value);
        break;
      case "admob_native_size":
        setNativeSize(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const changeUnit = {
      admob_enable: admobEnable,
      admob_ad_unit_path: adUnitPath,
      type,
      sizes,
      admob_native_size: nativeSize,
    };
    const unit = Object.assign(actualUnit, changeUnit)
    onChangeUnit(unit);
  }, [admobEnable, adUnitPath, type, sizes, nativeSize]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Input
              label="Admob ad unit ID"
              inputStyle={styles.input}
              onChangeText={setAdUnitPath}
              value={adUnitPath}
              renderErrorMessage={true}
              placeholder="Enter admob ad unit ID"
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 17, color: "grey" }}>
                AdMob Active
              </Text>
              <Switch
                color={THEME.MAIN_COLOR}
                value={admobEnable}
                onChange={() =>
                  setAdmobEnable((prevStatus) => (prevStatus = !prevStatus))
                }
              />
            </View>
          </View>
          <Select
            placeholder="Admob ad unit type"
            label="Admob ad unit type"
            value={type === 1 ? 'Banner' : 'Native'}
            list={bannerTypeList}
            onSelect={onSelect}
            unitField="type"
          />
          {type == 1 ? (
            <Select
              label="Admob ad unit size"
              value={Array.isArray(sizes) ? sizes[0].join('x') : sizes}
              list={bannerSizeList}
              onSelect={onSelect}
              unitField="sizes"
            />
          ) : (
            <Select
              value={nativeSize}
              label="Admob ad unit native size"
              onSelect={onSelect}
              list={nativeSizeList}
              unitField="admob_native_size"
            />
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
  },
  input: {
    borderBottomWidth: 0.5,
    borderWidth: 0,
  },
  inputActive: {
    borderBottomColor: THEME.MAIN_COLOR,
  },
});

export default Admob;
