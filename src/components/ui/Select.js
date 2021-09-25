import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, BottomSheet, ListItem } from 'react-native-elements'
import { THEME } from '../../theme';

const Select = ({ placeholder, label, onSelect, list, unitField, value }) => {


  const [localState, setLocalState] = useState(value)
  const [isVisible, setIsVisible] = useState(false)

  const choise = (item) => {
    setLocalState(item.field)
    onSelect(item.field, unitField)
    setIsVisible(false)
  }

  useEffect(() => {

  }, [])
  return (
    <View style={styles.select}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{localState}</Text>
        <Button onPress={() => setIsVisible(true)} buttonStyle={styles.button} title="Select" iconRight icon={() => <MaterialCommunityIcons name="form-select" size={24} color="#fff" />} />
      </View>
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem key={i} containerStyle={l.containerStyle} onPress={() => choise(l)}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: THEME.MAIN_COLOR
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: THEME.TEXT_COLOR,
    marginBottom: 10
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5
  },
  select: {
    paddingHorizontal: 10,
    marginBottom: 10
  }
})

export default Select;
