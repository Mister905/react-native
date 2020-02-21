import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const DetailScreen = props => {
  const { navigation } = props;

  const { state } = useContext(Context);

  const blog_post = state.blog_posts.find(blog_post => {
    return blog_post.id === navigation.getParam("id");
  });

  return (
    <View>
      <Text>{blog_post.title}</Text>
      <Text>{blog_post.content}</Text>
    </View>
  );
};

DetailScreen.navigationOptions = props => {
  const { navigation } = props;
  const { navigate } = navigation;
  
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigate("Edit", { id: navigation.getParam("id") })}
      >
        <Feather name="edit" size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({});

export default DetailScreen;
