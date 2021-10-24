import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import { Input, Switch } from "react-native-elements";

import { THEME } from "../../theme";

const Bidder = ({ name, geo, params, paused }) => {
  const [status, setStatus] = useState(paused);
  const [keyName, setName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.bidder}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(!open)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{name || "---"}</Text>
          <Switch
            color={THEME.MAIN_COLOR}
            value={status}
            onChange={() =>
              setStatus((prevStatus) => (prevStatus = !prevStatus))
            }
          />
        </View>
      </TouchableOpacity>

      {open ? (
        <>
          {params.map((p) => (
            <Input
              label={p.key}
              inputStyle={styles.input}
              onChangeText={setName}
              value={!keyName ? p.value : keyName}
              renderErrorMessage={true}
              placeholder=""
              key={p.key}
            />
          ))}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  bidder: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  title: {
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 0.5,
    borderWidth: 0,
  },
});

export default Bidder;
