import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Button, Text } from 'react-native';
import { theme, Input, Radio } from 'galio-framework';
const { width } = Dimensions.get('screen');
import { Formik } from 'formik';

const SearchForm = ({ onSubmit, ...props }) => {
  const values = {
    guests: 0,
    facilities: []
  };

  const facilities = ["whiteboard", "video", "postit", "coffee", "fridge", "tv", "projector"];

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik
      initialValues={{ guests: 0, facilities: [] }}
      onSubmit={handleSubmit()}
    >
      <ScrollView>
        <Input
          type="number-pad"
          label="Enter the number of guests for the room:"
          placeholder="Enter the number of guests for the room"
          value={values.guests}
        />
        <Text>Choose the facilities you need:</Text>

        {facilities.map(item => (
          <Radio
            label={item}
            flexDirection="row"
            radioOuterStyle={{display: 'none'}}
            radioInnerStyle={{display: 'none'}}
            containerStyle={styles.tagContainer}
            labelStyle={styles.facilitiesTag}
            onChange={item => values.facilities.push(item)}
          />))
        }

        <Button onPress={handleSubmit} title="Get a room" />
      </ScrollView>
    </Formik>
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
