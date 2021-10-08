const stubDB = {
  cool: {
    id: "cool",
    docData: ""
  }
};

/**
 * Gets a document from the database.
 * @param {string} id the id of the document
 */
async function getDoc(id) {
  // if (!id || stubDB[id]) return;
  if (!stubDB[id]) {
    stubDB[id] = {
      id,
      docData: ""
    }
  }
  return stubDB[id];
}

async function setDoc(id, data) {
  stubDB[id] = data;
  return {};
}

module.exports = { getDoc, setDoc };
