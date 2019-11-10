import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Button } from 'galio-framework';

import { Card } from '../components';
const { width } = Dimensions.get('screen');

import { findByCalendar } from '../services/rooms';
import slots from '../constants/slots';



class Rooms extends React.Component {
  
  renderSlots = () => {
    const { navigation } = this.props;
    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
            
            {slots.map(slot => (
              <Card key={slot.room} item={slot} horizontal  />
            ))}
          </Block>
        </ScrollView>
        <Block>
          <Button onPress={() => navigation.navigate('Pro', {facilities: ['coffee']})}>Discover</Button>
        </Block>
      </Block>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderSlots()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Rooms;
