import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Toast } from "galio-framework";

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          {/* <Block>
            <Text />
          </Block> */}
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
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE
  }
});

export default Home;
