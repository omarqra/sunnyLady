import * as constent from "../Constants";

const articlsreducers = (articleViewID = null, action) => {
  switch (action.type) {
    case constent.GETCLICKEDARTICLE:
      return action.payload;
    default:
      return articleViewID;
  }
};

export default articlsreducers;
