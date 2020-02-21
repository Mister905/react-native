import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import ResultItem from "./ResultItem";
import { withNavigation } from "react-navigation";

const ResultList = props => {
  const { title, businesses, navigation } = props;
  const { navigate } = navigation;
  if (!businesses.length) {
    return null;
  }
  return (
    <View style={styles.result_list_container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={businesses}
        keyExtractor={business => business.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate("Detail", { id: item.id })}
            >
              <ResultItem result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  result_list_container: {
    marginVertical: 15,
    marginLeft: 15
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  }
});

export default withNavigation(ResultList);
