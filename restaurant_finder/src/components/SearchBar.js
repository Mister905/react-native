import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = props => {
  const { term, on_search_change, on_term_submit } = props;
  return (
    <View style={styles.search_bar_container}>
      <Feather name="search" style={styles.search_icon} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        style={styles.text_input}
        value={term}
        // Changed text is passed as string argument to the callback handler
        onChangeText={on_search_change}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={on_term_submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search_bar_container: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row"
  },
  text_input: {
    flex: 1,
    fontSize: 18
  },
  search_icon: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15
  }
});

export default SearchBar;
