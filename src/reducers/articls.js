import * as constent from "../Constants";

const articlsreducers = (articls = [], action) => {
  switch (action.type) {
    case constent.GETALLARTICLS:
      return action.payload;
    case constent.ADDNEWARTICLE:
      return [...action.payload, ...articls];
    case constent.DELETEONEARTICLE:
      const filteredArticle = articls.filter(
        (item) => !(item._id === action.payload)
      );
      return filteredArticle;
    case constent.UPDATEONEARTICLE:
      const articlsDonotUpdated = articls.filter(
        (artile) => !(artile._id === action.payload._id)
      );
      return [action.payload, ...articlsDonotUpdated];
    default:
      return articls;
  }
};

export default articlsreducers;
