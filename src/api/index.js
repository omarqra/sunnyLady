import axios from "axios";

const url = "https://new-lady-app.herokuapp.com/";

export const sheckShangePosts = (payload) =>
  axios.put(url + "article", payload);

export const fetchPosts = (ids) => axios.get(url + "article", { data: ids });

export const PostArticle = (postload) => axios.post(url + "article", postload);

export const deletePosts = (deleteLoad) =>
  axios.delete(url + "article", { data: deleteLoad });

export const updatePosts = (updateLoad) =>
  axios.patch(url + "article", updateLoad);

export const shackPasswordPost = (userload) =>
  axios.post(url + "Login", userload);

export const fetchOnePosts = (myArticleID) => {
  console.log(url + myArticleID);
  axios.get(url + myArticleID);
};
