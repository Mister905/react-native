import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

const EditScreen = props => {
  const { navigation } = props;
  const { pop } = navigation;

  const { state, update_blog_post } = useContext(Context);

  const blog_post = state.blog_posts.find(
    blog_post => blog_post.id === navigation.getParam("id")
  );

  const [title, set_title] = useState(blog_post.title);
  const [content, set_content] = useState(blog_post.content);

  return (
    <View>
      <Text style={styles.label}>Edit Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => set_title(text)}
      />
      <Text style={styles.label}>Edit Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={content => set_content(content)}
      />
      <Button
        title="Edit Post"
        onPress={() => {
          update_blog_post({ id: blog_post.id, title, content }, () => {
            pop();
          });
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default EditScreen;
