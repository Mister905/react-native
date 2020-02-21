import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

const CreateScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;
  const [title, set_title] = useState("");
  const [content, set_content] = useState("");
  const { create_blog_post } = useContext(Context);

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => set_title(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={content => set_content(content)}
      />
      <Button
        title="Create Post"
        onPress={() => {
          create_blog_post({ title, content }, () => {
            navigate("Index");
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

export default CreateScreen;
