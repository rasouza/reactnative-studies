import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Text,
  Image
} from "react-native";
import { theme, Input, Checkbox } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
    navigation.navigate("Rooms", { guests, facilities });
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
