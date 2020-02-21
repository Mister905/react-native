import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = props => {
  const {
    state,
    get_blog_posts,
    create_blog_post,
    delete_blog_post
  } = useContext(BlogContext);

  const { navigation } = props;

  const { navigate } = navigation;

  useEffect(() => {
    get_blog_posts();
    const listener = navigation.addListener("didFocus", () => {
      get_blog_posts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <Text>Index Screen</Text>
      <FlatList
        data={state.blog_posts}
        keyExtractor={blog_post => blog_post.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate("Detail", { id: item.id })}
            >
              <View style={styles.row}>
                <Text>
                  {item.title} - {item.content}
                </Text>
                <TouchableOpacity onPress={() => delete_blog_post(item.id)}>
                  <Feather name="trash" style={styles.trash_icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = props => {
  const { navigate } = props.navigation;
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18
  },
  trash_icon: {
    fontSize: 24
  }
});

export default IndexScreen;
