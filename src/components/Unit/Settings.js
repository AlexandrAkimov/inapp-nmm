import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Keyboard, Button } from 'react-native';
import { Switch, BottomSheet, ListItem, Input } from 'react-native-elements'
import { THEME } from '../../theme';
import Select from '../ui/Select';

const Settings = ({ app, unit, navigation, onChangeApp, onChangeUnit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState(unit.name)
  const [admobSize, setAdmobSize] = useState(unit.admob_size)
  const [adUnitPath, setAdUnitPath] = useState(unit.ad_unit_path)
  const [position, setPosition] = useState(unit.position)
  const [paddingTop, setPaddingTop] = useState(unit.padding_top)
  const [injectPeriod, setInjectPeriod] = useState(unit.inject_period)
  const [injectCount, setInjectCount] = useState(unit.inject_count)
  const [adRefresh, setAdRefresh] = useState(unit.ad_refresh)
  const [showIn, setShowIn] = useState(unit.show_in)
  const [status, setStatus] = useState(unit.is_active)
  const [betweenArticles, setBetweenArticles] = useState(unit.between_articles)
  const [lazyLoad, setLazyLoad] = useState(unit.lazy_load)

  const positionList = [
    { title: 'Sticky Top', field: 'sticky_top', cb: setPosition },
    { title: 'Sticky Bottom', field: 'sticky_bottom', cb: setPosition },
    { title: 'In Content', field: 'in_content', cb: setPosition },
    { title: 'Interstitial', field: 'interstitial', cb: setPosition },
    {
      title: 'Cancel',
      titleStyle: { color: 'tomato' },
      onPress: () => setIsVisible(false),
    }
  ]

  const adMobSizeList = [
    { title: '1x1', field: '1x1', cb: setAdmobSize },
    { title: '160x160', field: '160x160', cb: setAdmobSize },
    { title: '300x250', field: '300x250', cb: setAdmobSize },
    { title: '300x600', field: '300x600', cb: setAdmobSize },
    { title: '320x50', field: '320x50', cb: setAdmobSize },
    { title: '320x100', field: '320x100', cb: setAdmobSize },
    { title: '970x90', field: '970x90', cb: setAdmobSize },
    { title: '970x250', field: '970x250', cb: setAdmobSize },
    {
      title: 'Cancel',
      titleStyle: { color: 'tomato' },
      onPress: () => setIsVisible(false),
    }
  ]

  const onSelect = (value, unitField) => {
    switch (unitField) {
      case 'admob_size':
        setAdmobSize(value)
        break;
      case 'position':
        console.log(value);
        setPosition(value)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    onChangeUnit(name, adUnitPath)
  }, [name, adUnitPath])

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Input
            label="Name"
            inputStyle={styles.input}
            onChangeText={setName}
            value={name}
            renderErrorMessage={true}
            placeholder='Enter app name'
          />
          <Input
            label="Google Admanager"
            onChangeText={setAdUnitPath}
            value={adUnitPath}
            renderErrorMessage={true}
            placeholder='Enter ad unit path'
          />
        </View>
        {
          position !== 'interstitial'
            ? <Select placeholder="Select size" label="Size" value={admobSize} list={adMobSizeList} onSelect={onSelect} unitField="admob_size" />
            : null
        }
        <Select placeholder="Select position" value={position} label="Position" onSelect={onSelect} list={positionList} unitField="position" />


        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'grey' }}>Status</Text>
            <Switch color={THEME.MAIN_COLOR} value={status} onChange={() => setStatus(prevStatus => prevStatus = !prevStatus)} />
          </View>
          {position === 'in_content'
            ? <>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'grey' }}>Between Articles</Text>
                <Switch color={THEME.MAIN_COLOR} value={betweenArticles} onChange={() => setBetweenArticles(prevStatus => prevStatus = !prevStatus)} />
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'grey' }}>Lazy Load</Text>
                <Switch color={THEME.MAIN_COLOR} value={lazyLoad} onChange={() => setLazyLoad(prevStatus => prevStatus = !prevStatus)} />
              </View>
            </>
            : null
          }
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {position === 'sticky_top'
            ? <Input
              containerStyle={{ width: '50%' }}
              label="Padding Top"
              onChangeText={setPaddingTop}
              value={paddingTop}
              keyboardType="number-pad"
              renderErrorMessage={true}
              placeholder='Enter padding top'
            />
            : null
          }
          {position === 'sticky_top' || position === 'in_content' || position === 'sticky_bottom'
            ? <Input
              containerStyle={{ width: '50%' }}
              label="Ad Refresh Every"
              keyboardType="number-pad"
              onChangeText={setAdRefresh}
              value={adRefresh}
              renderErrorMessage={true}
              placeholder='Enter ad refresh'
            />
            : null
          }
          {position === 'in_content'
            ? <>
              <Input
                containerStyle={{ width: '50%' }}
                label="Inject Period"
                keyboardType="number-pad"
                onChangeText={setInjectPeriod}
                value={injectPeriod}
                renderErrorMessage={true}
                placeholder='Enter inject period'
              />
              <Input
                containerStyle={{ width: '50%' }}
                label="Inject Count"
                keyboardType="number-pad"
                onChangeText={setInjectCount}
                value={injectCount}
                renderErrorMessage={true}
                placeholder='Enter inject count'
              />
            </>
            : null
          }
          {position === 'interstitial'
            ? <Input
              containerStyle={{ width: '50%' }}
              label="Show In"
              keyboardType="number-pad"
              onChangeText={setShowIn}
              value={showIn}
              renderErrorMessage={true}
              placeholder='Enter show in'
            />
            : null
          }
        </View>

      </View>
    </ScrollView>
  );
}

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
    borderBottomColor: THEME.MAIN_COLOR
  }
})

export default Settings;
