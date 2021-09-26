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

  useEffect(() => {
    onChangeApp({ name, url, admob_app_id: admobId, is_active: status })
  }, [name, url, admobId, status])

  return (
    <View style={styles.container}>
      <View>
        <Input
          label="Name"
          inputStyle={styles.input}
          onChangeText={setName}
          value={name}
          renderErrorMessage={true}
          placeholder='Enter app name'
        />
        <Input
          label="Appstore URL"
          onChangeText={setUrl}
          value={url}
          renderErrorMessage={true}
          placeholder='Enter app URL'
        />
        <Input
          label="Admob app ID"
          onChangeText={setAdmobId}
          value={admobId}
          renderErrorMessage={true}
          placeholder='Enter Admob app ID'
        />


      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'grey' }}>Status</Text>
        <Switch color={THEME.MAIN_COLOR} value={status} onChange={() => setStatus(prevStatus => prevStatus = !prevStatus)} />
      </View>

    </View>
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
