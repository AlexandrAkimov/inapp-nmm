import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard } from 'react-native';
import { Button, Switch } from 'react-native-elements'
import { Input } from 'react-native-elements';
import { THEME } from '../../theme';

const Settings = ({ app, navigation, onChangeApp }) => {
  const [name, setName] = useState(app.name)
  const [url, setUrl] = useState(app.url)
  const [admobId, setAdmobId] = useState(app.admob_app_id)
  const [status, setStatus] = useState(app.is_active)

  const saveApp = () => {
    dispatch(saveApp({
      app: { ...app, name, url, admob_app_id: admobId },
      adUnits,
      activities,
      selectActivities
    }))
  }

  const change = (text, cb) => {
    cb(text)
    onChangeApp({ name, url, admob_app_id: admobId, is_active: status })
  }
  useEffect(() => {
    console.log(name);
  }, [name, url, admobId, status])

  return (
    <View style={styles.container}>
      <View>
        <Input
          label="Name"
          inputStyle={styles.input}
          onChangeText={(text) => change(text, setName)}
          value={name}
          renderErrorMessage={true}
          placeholder='Enter app name'
        />
        <Input
          label="Appstore URL"
          onChangeText={(text) => change(text, setUrl)}
          value={url}
          renderErrorMessage={true}
          placeholder='Enter app URL'
        />
        <Input
          label="Admob app ID"
          onChangeText={(text) => change(text, setName)}
          value={admobId}
          renderErrorMessage={true}
          placeholder='Enter Admob app ID'
        />


      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'grey' }}>Status</Text>
        <Switch color={THEME.MAIN_COLOR} value={status} onChange={() => setStatus(prevStatus => prevStatus = !prevStatus)} />
      </View>
      <View style={{ width: '50%', justifyContent: 'center', flexDirection: 'column', alignSelf: 'flex-end' }}>
        <Button
          disabled={!name || !url}
          buttonStyle={{ backgroundColor: THEME.MAIN_COLOR, flexDirection: 'row', justifyContent: 'space-around' }}
          icon={
            <Ionicons name="save" size={25} color={'#fff'} />
          }
          title={!app.id ? 'SAVE CHANGES' : 'SAVE APP'}
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
    backgroundColor: THEME.LIGHT_COLOR
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
