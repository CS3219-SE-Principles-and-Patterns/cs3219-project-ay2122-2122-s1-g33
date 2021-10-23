DROP TABLE IF EXISTS Docs;

CREATE TABLE Docs (
    docId       text primary key,
    docTitle    text,
    userId      text,
    docText     text
);
