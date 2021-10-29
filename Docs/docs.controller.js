const Doc = require('./docs.model');
const { nanoid } = require('nanoid');
const generateDocId = () => {
    return nanoid(8);
}

const createDoc = (req, res) => {
    const { userId, docText, docTitle } = req.body;
    const docId = generateDocId();

    Doc.create({ docId, docTitle, userId, docText }, (err, data) => {
        if(err) {
            res.status(500).json('Could not create doc');
            // console.log(err.stack)
            
        } else {
            res.status(201).json({ docId, docTitle, userId, docText });
        }
    })
}

const deleteDoc = (req, res) => {
    const docId = req.params.docId;
    Doc.deleteByDocId(docId, (err, data) => {
        if(err) {
            res.status(500).json('Could not delete doc');
            // console.log(err.stack)
        } else {
            res.status(201).json({ docId });
        }
    })
}

const getDocByDocId = (req, res) => {
    const docId = req.params.docId;
    Doc.getByDocId(docId, (err, data) => {
        if(err) {
            // console.log(err.stack)
            res.status(500).json('Error retrieving doc from given doc id');
            return;
        } 

        if(data.rowCount == 0) {
            res.status(404).send('No doc associated with given doc id');
            return;
        }

        const docText = data.rows[0].doctext;
        const docTitle = data.rows[0].doctitle;
        const userId = data.rows[0].userid;
        res.status(200).json({ docId, docTitle, docText, userId });
    });
};

const getDocsByUserId = (req, res) => {
    const userId = req.params.userId;
    Doc.getByUserId(userId, (err, data) => {
        if(err) {
            // console.log(err.stack)
            res.status(500).json('Error retrieving docs from given user id');
        } else {
            res.status(200).json(data.rows);
        }
    });
};

const patchDocText = (req, res) => {
    const docId = req.params.docId;
    const { docText } = req.body;
    Doc.patchDocText(docId, docText, (err, data) => {
        if(err) {
            // console.log(err.stack)
            res.status(500).json('Error patching docs of given doc id');
        } else {
            res.status(200).send();
        }
    });
};

module.exports = {
    createDoc,
    getDocByDocId,
    getDocsByUserId,
    patchDocText
}
