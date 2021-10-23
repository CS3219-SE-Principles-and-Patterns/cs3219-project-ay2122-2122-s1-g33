# Sessions Service

The Sessions service is in charge of maintaining the state of active code docs for everyone currently accessing it.
It is also in charge of calling the Code Executor API and preventing further edits whenever the code is being executed.

## Listening Socket Events
Here is a list of events that the Sessions service listens to from the front end.

| Event | Data | Description |
|---|---|---|
| get-document | documentId: string userId: string | Open a currently active document session, or create a new session.  A `load-document` event will be emitted if a document can be found. A `document-not-found` event will be emitted if no document with the specified document ID can be found in the main docs db, and the user will be disconnected from the socket. |
| send-changes | delta: Delta | Update the document for everyone, with a Quill Delta (Quill is the library that we're using for front-end) |
| run-code | userId: string data: string | Run the current code. Editing will not be possible while the code is being run. |
| save-document | data: string | Save the document in the cache, which will be written to the docs database every 10s. |
| disconnecting | reason: string | This event is automatically sent by the socket whenever the user disconnects. |

## Emitted Socket Events

Here is a list of events that the Sessions service emits.

| Event | Data | Description |
|---|---|---|
| document-not-found | docId: string | The requested document cannot be found in the docs database. |
| receive-changes | delta: Delta | Update the document with changes made by another editor. |
| code-execution-start | userId: string data: string | The code document is currently being executed by the code executor. No changes can currently be applied. |
| code-execution-end | data: {   output: string,   message: string } \| {   error: string,   message: string } | The code execution has ended, providing either a  good or bad output. |
| code-still-running |  | The code doc you are trying to edit is still running a code execution. |
| user-disconnecting | reason: string | A user has disconnected from the session |