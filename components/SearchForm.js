import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { theme, Checkbox, Block, Text, Input } from "galio-framework";
import { Icons } from '../constants/';
import Button from './Button';
const { width } = Dimensions.get("screen");


const initial_facilities = [
  "whiteboard",
  "video",
  "postIt",
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
    <Block style={styles.home}>
      <Text h5>Guests:</Text>
      <Input
        right
        rounded
        color="#562E70"
        type="number-pad"
        borderColor="#562E70"
        placeholderTextColor="#562E70"
        placeholder="Enter the number of guests for the room"
        onChangeText={value => setGuests(value)}
      />

      <Text h5 style={{marginTop: 20}}>Facilities:</Text>

      <Block row style={styles.block}>
        {initial_facilities.map(item => (
          <View 
            key={item.toLowerCase()}
            style={styles.checkboxContainer}
          >
            <Checkbox
              key={item.toLowerCase()}
              value={item}
              label={item.toUpperCase()}
              checkboxStyle={styles.checkboxLabel}
              onChange={checked => toggleFacility(item, checked)}
            />
          </View>
        ))}
      </Block>

      <Button
        uppercase
        shadowless
        regularSize
        textWhite
        style={styles.ctaButton}
        onPress={() => handleSubmit(guests, facilities)}
      >
        Get a room!
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    padding: 5,
    paddingTop: 20
  },
  block: {
    marginTop: 20,
    flexWrap: 'wrap'
  },
  checkboxContainer: {
    paddingLeft: 5,
    margin: theme.SIZES.BASE/4,
    width: width/2.5
  },
  checkboxLabel: {
    color: '#FFF'
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#3DCBA1'
  }
});

export default SearchForm;
