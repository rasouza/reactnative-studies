import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Checkbox, Block, Button, Text, theme } from "galio-framework";
import Input from "./Input";

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
    <Block>
      <Text h5>Guests:</Text>
      <Input
        right
        type="number-pad"
        placeholder="Enter the number of guests for the room"
        onChangeText={value => setGuests(value)}
      />

      <Text h5>Facilities:</Text>
      {initial_facilities.map(item => (
        <Checkbox
          key={item}
          value={item}
          label={item.toUpperCase()}
          onChange={checked => toggleFacility(item, checked)}
        />
      ))}
      {/* <Button
        onPress={() => handleSubmit(guests, facilities)}
        title="Get a room"
      /> */}
      <Button color="primary" onPress={() => handleSubmit(guests, facilities)}>
        GET A ROOM!
      </Button>
    </Block>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  }
});

export default SearchForm;
