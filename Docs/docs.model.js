const db = require('./db');

function Doc(doc) {
    this.docId = doc.docId;
    this.docTitle = doc.docTitle;
    this.userId = doc.userId;
    this.docText = doc.docText;
}

Doc.create = (doc, callback) => {
    db.query('INSERT INTO Docs (docId, docTitle, userId, docText) VALUES ($1, $2, $3, $4)', [doc.docId, doc.docTitle, doc.userId, doc.docText], 
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
}

Doc.getByDocId = (docId, callback) => {
    db.query('SELECT * FROM Docs WHERE docId = $1', [docId],
    (error, results) => {
        if(error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

Doc.getByUserId = (userId, callback) => {
    db.query('SELECT * FROM Docs WHERE userId = $1', [userId],
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
}

Doc.patchDocText = (docId, docText, callback) => {
    db.query('UPDATE Docs SET docText = $1 WHERE docId = $2', [docText, docId],
        (error, results) => {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
}

module.exports = Doc;