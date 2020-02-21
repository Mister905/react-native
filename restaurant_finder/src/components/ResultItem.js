import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultItem = props => {
  const { result } = props;

  return (
    <View style={styles.result_item_container}>
      <Image
        source={result.image_url.length != 0 ? { uri: result.image_url } : null}
        style={styles.result_image}
      />
      <Text style={styles.result_name}>{result.name}</Text>
      <Text>
        {result.rating} Stars, {result.review_count} Reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  result_image: {
    height: 120,
    width: 250,
    borderRadius: 4
  },
  result_name: {
    fontWeight: "bold"
  }
});

export default ResultItem;
