import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { THEME } from "../../theme";
import Bidder from "./Bidder";
import { bidders } from "./bidders";

const Demand = ({ unit }) => {
  const selectedBidders = bidders.filter((b) =>
    unit.params.some((ub) => ub.bidder === b.bidder)
  );

  const [selectedItems, setSelectedItems] = useState(unit.params);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems])

  return (
    <View style={styles.wrapper}>
      <MultiSelect
        items={bidders}
        uniqueKey="bidder"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Bidders Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="bidder"
        searchInputStyle={{ color: "#CCC" }}
        textInputProps={{ autoFocus: false }}
        submitButtonColor={THEME.MAIN_COLOR}
        submitButtonText="Select"
      />

      <FlatList
        data={selectedItems}
        keyExtractor={item => item.bidder}
        renderItem={({item}) => (
          <Bidder
            name={item.bidder}
            params={item.params}
            paused={item.paused}
          />
        )}
      />

      {/* <Bidder
        name="Pubmatic"
        paused={true}
        params={[
          { key: "publisherId", value: "1654", type: "string" },
          { key: "adSlot", value: "GetSpain_in_app", type: "string" },
        ]}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});

export default Demand;
