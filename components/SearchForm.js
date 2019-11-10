import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Button, Text } from "react-native";
import { theme, Input, Checkbox } from "galio-framework";
const { width } = Dimensions.get("screen");

const initial_facilities = [
  "whiteboard",
  "video",
  "postit",
  "coffee",
  "fridge",
  "tv",
  "projector"
];

const SearchForm = ({ onSubmit, ...props }) => {
  const { navigation } = props;
  const [guests, setGuests] = useState(null);
  const [facilities, setFacilities] = useState([]);

  const handleSubmit = (guests, facilities) => {
    navigation.navigate("Elements", { guests, facilities });
  };

  const toggleFacility = (item, checked) => {
    if (checked) {
      return setFacilities([...facilities, item]);
    }

    return setFacilities(facilities.filter(facility => facility !== item));
  };

  return (
    <ScrollView>
      <Input
        type="number-pad"
        label="Enter the number of guests for the room:"
        placeholder="Enter the number of guests for the room"
        onChangeText={value => setGuests(value)}
      />

      <Text>Choose the facilities you need:</Text>

      {initial_facilities.map(item => (
        <Checkbox
          key={item}
          value={item}
          label={item.toUpperCase()}
          onChange={checked => toggleFacility(item, checked)}
        />
      ))}

      <Button
        onPress={() => handleSubmit(guests, facilities)}
        title="Get a room"
      />
    </ScrollView>
  );
};

export default SearchForm;
