import React, { useState, useCallback } from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { theme, Block, Text, Input } from "galio-framework";
import { Icons } from '../constants/';
import Button from './Button';
import Selector from './Selector';
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

  const toggleFacility = useCallback(facility => () => {
    setFacilities(prev => {
      const active = prev.includes(facility);
      return active ? prev.filter(p => p !== facility) : [...prev, facility];
    });
  });

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

      <Block center row style={styles.block}>

        {initial_facilities.map(item => (
          <View key={item.toLowerCase()}>
            <Selector
              key={item.toLowerCase()}
              active={facilities.includes(item)}
              onChange={toggleFacility(item)}
            >
              <Image
                source={Icons[`${item}Purple`]}
                style={styles.selectorImage}
                resizeMode="contain"
              />
            </Selector>
            <Text center>{item}</Text>
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

const ICON_SIZE = 50;

const styles = StyleSheet.create({
  home: {
    padding: 5,
    paddingTop: 15
  },
  block: {
    marginTop: 20,
    flexWrap: 'wrap'
  },
  selectorImage: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#3DCBA1'
  }
});

export default SearchForm;
