import create_data_context from "./create_data_context";
import json_server from "../api/json_server";

const initial_state = {
  blog_posts: []
};

const blog_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "get_blog_posts":
      return {
        ...state,
        blog_posts: payload
      };

    case "delete_blog_post":
      return {
        ...state,
        blog_posts: state.blog_posts.filter(
          blog_post => blog_post.id !== payload
        )
      };

    default:
      return {
        state
      };
  }
};

const get_blog_posts = dispatch => {
  return async () => {
    const res = await json_server.get("/blog_posts");

    dispatch({ type: "get_blog_posts", payload: res.data });
  };
};

const create_blog_post = dispatch => {
  return async (blog_post, navigate) => {
    await json_server.post("/blog_posts", blog_post);
    navigate();
  };
};

const delete_blog_post = dispatch => {
  return async blog_post_id => {
    await json_server.delete(`/blog_posts/${blog_post_id}`);
    const res = await json_server.get("/blog_posts");
    dispatch({ type: "get_blog_posts", payload: res.data });
  };
};

const update_blog_post = dispatch => {
  return async (blog_post, pop) => {
    await json_server.put(`/blog_posts/${blog_post.id}`, blog_post);

    const res = await json_server.get("/blog_posts");
    dispatch({ type: "get_blog_posts", payload: res.data });
    pop();
  };
};

export const { Context, Provider } = create_data_context(
  blog_reducer,
  {
    get_blog_posts,
    create_blog_post,
    delete_blog_post,
    update_blog_post
  },
  initial_state
);
