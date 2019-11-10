import React, { useState } from "react";
// import { StyleSheet, Dimensions, ScrollView } from "react-native";
// import { Checkbox, Block, Button, Text, theme } from "galio-framework";
// import Input from "./Input";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { theme, Checkbox, Block, Text } from "galio-framework";
import { Icons } from '../constants/';
import Button from './Button';
import Input from './Input';
// import { StyleSheet, Dimensions, View, ScrollView, Button, Text } from "react-native";
// import { theme, Input, Checkbox } from "galio-framework";
// import ViewShot from "react-native-view-shot";
const { width } = Dimensions.get("screen");


const initial_facilities = [
  // "Whiteboard",
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
    <Block center style={styles.home}>
      <Text h5>Guests:</Text>
      <Input
        right
        type="number-pad"
        placeholder="Enter the number of guests for the room"
        onChangeText={value => setGuests(value)}
      />

      <Text h5>Facilities:</Text>
      {initial_facilities.map(item => (
        <View 
          // style={styles.checkboxContainer}
          // style={{backgroundImage: 'url(`${CoffeePurple}`)', padding: 10}}
        >
          <Checkbox
            key={item.toLocaleLowerCase()}
            value={item}
            label={item.toUpperCase()}
            checkboxStyle={styles.checkboxLabel}
            onChange={checked => toggleFacility(item, checked)}
          />
          {/* <Image source={Icons[`${item}Purple`]}
            style={{ width: 20, height: 20, marginBottom: 20 }}/> */}
        </View>
      ))}

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
// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     shadowOpacity: 0.2,
//     elevation: 2
//   },
//   social: {
//     width: theme.SIZES.BASE * 3.5,
//     height: theme.SIZES.BASE * 3.5,
//     borderRadius: theme.SIZES.BASE * 1.75,
//     justifyContent: "center"
//   }
// });

const styles = StyleSheet.create({
  home: {
    // width: width,
    padding: 8,
    paddingTop: 20
  },
  checkboxContainer: {
    margin: theme.SIZES.BASE/4,
    width: 'auto',
    // padding:theme.SIZES.BASE/2,
    // backgroundColor: '#DDD'
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
