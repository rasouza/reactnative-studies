import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Button, Text } from 'react-native';
import { theme, Input, Checkbox } from 'galio-framework';
const { width } = Dimensions.get('screen');

const SearchForm = ({ onSubmit, ...props }) => {
  const [ guests, setGuests ] = useState(0);
  const [ facilities, setFacilities ] = useState([]);

  const values = {
    guests: guests,
    facilities: facilities
  };

  const facilities = ["whiteboard", "video", "postit", "coffee", "fridge", "tv", "projector"];

  const handleSubmit = (guests, facilities) => {
    setGuests(guests);

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
      <ScrollView>
        <Input
          type="number-pad"
          label="Enter the number of guests for the room:"
          placeholder="Enter the number of guests for the room"
          value={guests}
        />

        <Text>Choose the facilities you need:</Text>

        {facilities.map(item => (
          <Checkbox
            key={item}
            value={item}
            label={item}
            flexDirection="row"
            checkboxStyle={styles.tagContainer}
            labelStyle={styles.facilitiesTag}
            onChange={item => console.log(item) }
          />))
        }

        <Button onPress={handleSubmit} title="Get a room" />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchForm: {
    width: width,
    padding: '15px'
  },
  tagContainer: {
    display: 'flex'
  },
  facilitiesTag: {
    margin: theme.SIZES.BASE/2,
    width: 'auto',
    padding: theme.SIZES.BASE/2,
    borderRadius: theme.SIZES.BASE/2,
    backgroundColor: '#ff00ee',
    color: '#fff'
  }
});

export default SearchForm;
