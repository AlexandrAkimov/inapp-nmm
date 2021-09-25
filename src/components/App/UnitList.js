import React, { useEffect } from 'react';
import {View, StyleSheet, Text, Animated, FlatList, Button} from 'react-native';
import { useSelector } from 'react-redux';
import UnitItem from '../ui/UnitItem';

const UnitList = ({app, navigation}) => {

  //const {adUnits} = useSelector(state => state.adUnits)

  const adUnits = [{
    id: 1,
    name: 'Unit 1',
    position: 'Sticky Top'
  }]

  const goToUnit = (unit) => {
    navigation.navigate('Unit', { unit, app })
  }

  useEffect(() => {
    //dispatch(loadAppUnits(app.id))
  }, [])
  return (
    <View style={styles.container}>
      <Button title="Add new unit" onPress={() => goToUnit({})}/>
      <FlatList
        style={styles.list}
        data={adUnits}
        keyExtractor={unit => unit.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        renderItem={({ item }) => <UnitItem unit={item} onOpen={goToUnit} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1,
    width: '100%'
  }
})

export default UnitList;
