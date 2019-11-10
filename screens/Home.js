import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Toast, Text } from "galio-framework";

import { Card, SearchForm } from "../components";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
      </ScrollView>
    );
  };

  render() {
    const { navigation } = this.props;
    const showToast = navigation.getParam('flash', false)
    return (
      <Block flex center style={styles.home}>
        <Block flex style={styles.topBar}>
          <Text h5 style={styles.topText}>
            Select the options for your room:
          </Text>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>
            <SearchForm navigation={navigation} />
          </Block>
        </ScrollView>
        <Toast
          isShow={showToast}
          fadeOutDuration={300}
          positionIndicator="center"
          color="success"
        >
          Room booked successfully
        </Toast>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  topBar: {
    width: width,
    padding: 10,
    paddingTop: 40,
    maxHeight: 80,
    backgroundColor: '#562E70'
  }, 
  topText: {
    color: '#FFF'
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  }
});

export default Home;
