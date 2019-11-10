import React from "react";
import Intl from "intl";
import locale from "intl/locale-data/jsonp/pt";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";

import { Card } from "../components";
const { width } = Dimensions.get("screen");

import { findByCalendar } from "../services/rooms";

import getFreeSlots from "../services/slots";

const formatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h24",
  timeZoneName: "short"
};

const formatDateTime = dateTime =>
  new Intl.DateTimeFormat(locale, formatOptions)
    .formatToParts(new Date(dateTime))
    .reduce((accumulator, item) => {
      accumulator[item.type] = item.value;
      return accumulator;
    }, []);

const formatSlots = slots =>
  slots.map(slot => {
    const start = formatDateTime(slot.start);
    const end = formatDateTime(slot.end);

    slot.startDateTime = slot.start;
    slot.endDateTime = slot.end;

    slot.start = `${start.hour}:${start.minute}`;
    slot.end = `${end.hour}:${end.minute}`;

    return slot;
  });

class Rooms extends React.Component {
  state = {
    slots: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const facilities = navigation.getParam('facilities', [])
    const guests = navigation.getParam('guests', 99)

    getFreeSlots(facilities, guests).then(slots => this.setState({ slots: formatSlots(slots) })).catch(res => console.log(res));
  }
  renderSlots = () => {
    const { navigation } = this.props;

    return (
      <Block>
        <Text size={22} style={styles.cardTitle}>
          Search results
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>
            {this.state.slots.map(slot => (
              <Card key={`${slot.room}${slot.start}`} item={slot} horizontal navigation={navigation}/>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  };

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
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  }
});

export default Rooms;
