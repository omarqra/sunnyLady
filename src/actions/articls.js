import * as constent from "../Constants";
import * as api from "../api/index.js";

export const getAllArticls = (ids) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(ids);
    console.log("fetched");
    dispatch({ type: constent.GETALLARTICLS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addNewArticle = (newArticle) => async (dispatch) => {
  dispatch({ type: constent.ADDNEWARTICLE, payload: newArticle });
};

export const deletOneArticle = (articleToDelete) => async (dispatch) => {
  try {
    const { data } = await api.deletePosts(articleToDelete);
    if (data.isDeleted) {
      const deletedArticleID = articleToDelete.id;
      dispatch({ type: constent.DELETEONEARTICLE, payload: deletedArticleID });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateOneArticle = (articleToUpdate) => async (dispatch) => {
  const updatedArticle = articleToUpdate.articleToUpdate;
  try {
    const { data } = await api.updatePosts(articleToUpdate);
    if (data.isUpdated) {
      dispatch({ type: constent.UPDATEONEARTICLE, payload: updatedArticle });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getClickedID = (id) => async (dispatch) => {
  dispatch({ type: constent.GETCLICKEDARTICLE, payload: id });
};
