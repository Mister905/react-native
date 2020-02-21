import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const DetailScreen = props => {
  const { navigation } = props;
  const id = navigation.getParam("id");

  const [business, set_business] = useState(null);

  useEffect(() => {
    get_business(id);
  }, []);

  const get_business = async business_id => {
    const res = await yelp.get(`/${business_id}`);
    set_business(res.data);
  };

  if (!business) {
    return null;
  }

  return (
    <View>
      <Text>{business.name}</Text>
      <FlatList
        data={business.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.detail_image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detail_image: {
    height: 200,
    width: 300
  }
});

export default DetailScreen;
