const docsController = require('./docs.controller');

module.exports = app => {
    app.post('/createDoc', docsController.createDoc),
    app.get('/getDoc/:docId', docsController.getDocByDocId),
    app.get('/getUserDocs/:userId', docsController.getDocsByUserId)
}