import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { theme, Checkbox, Block, Text, Input } from "galio-framework";
import { Icons } from '../constants/';
import Button from './Button';
const { width } = Dimensions.get("screen");


const initial_facilities = [
  "Whiteboard",
  "Video",
  "PostIt",
  "Coffee",
  "Fridge",
  "Tv",
  "Projector"
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
          <View style={styles.checkboxContainer}>
            <Checkbox
              key={item.toLocaleLowerCase()}
              value={item}
              label={item.toUpperCase()}
              checkboxStyle={styles.checkboxLabel}
              onChange={checked => toggleFacility(item, checked)}
            />
          </View>
        ))}
      </Block>

      <Button
        regularSize
        style={styles.ctaButton}
        onPress={() => handleSubmit(guests, facilities)}
      >
        GET A ROOM!
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    padding: 8,
    paddingTop: 20
  },
  block: {
    marginTop: 20,
    flexWrap: 'wrap'
  },
  checkboxContainer: {
    margin: theme.SIZES.BASE/4,
    width: width/3
  },
  checkboxLabel: {
    color: '#FFF'
  },

  ctaButton: {
    marginTop: 20,
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#3DCBA1'
  },

  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  }
});

export default SearchForm;
