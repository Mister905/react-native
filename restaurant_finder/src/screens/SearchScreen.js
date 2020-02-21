import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import use_businesses from "../hooks/use_businesses";
import ResultList from "../components/ResultList";

const SearchScreen = () => {
  const [term, set_term] = useState("");

  const [business_search, businesses, error] = use_businesses();

  const filter_businesses_by_price = price => {
    // price === '$' || '$$' || '$$$'
    return businesses.filter(business => {
      return business.price === price;
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        on_search_change={set_term}
        on_term_submit={() => business_search(term)}
      />

      {error ? <Text>Something went wrong...</Text> : null}
      <ScrollView>
        <ResultList
          title={"Low-Price"}
          businesses={filter_businesses_by_price("$")}
        />
        <ResultList
          title={"Mid-Price"}
          businesses={filter_businesses_by_price("$$")}
        />
        <ResultList
          title={"Higher-Price"}
          businesses={filter_businesses_by_price("$$$")}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  results_message: {
    marginLeft: 15,
    marginTop: 15
  }
});

export default SearchScreen;
