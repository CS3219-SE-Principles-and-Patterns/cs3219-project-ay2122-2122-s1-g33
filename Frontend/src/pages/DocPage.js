
import { useEffect, useState } from "react";
import EditorDashboard from "../components/EditorDashboard";
import Header from "../common/Header";
import FullContainer from "../common/FullContainer";
import Button from "../components/Button";
import { LoadingOutlined, PlayCircleFilled } from "@ant-design/icons";
import API from "../util/API";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import Delta from "quill-delta"

const DocPage = () => {
    const [showOutput, setShowOutput] = useState(false);
    const [output, setOutput] = useState("Compiling code...");
    const [isExecuting, setIsExecuting] = useState(false);
    const { id } = useParams();
    const [socket, setSocket] = useState();
    const [delta, setDelta] = useState();


    useEffect(() => {
        const s = io(process.env.REACT_APP_SESSIONS_SERVER_URL);
        setSocket(s);

        s.emit("get-document", id);

        s.once("load-document", async document => {
            const { docData, isCodeExecRunning } = document
            if(isCodeExecRunning) {
                toggleCodeExcecutingMode()
            }
            setDelta(new Delta([{
                insert: docData
            }]))
        })

        s.on("document-not-found", async docId => {
            setDelta(new Delta([{
                insert: "# document not found"
            }]))
        })

        
        return () => {
            s.disconnect()
        }
    }, [])

    const handleReceiveChanges = newDelta => {
        const composed = delta.compose(newDelta);
        setDelta(composed);
    }

    useEffect(() => {
        if(delta == null | socket == null) return;
        socket.on("receive-changes", handleReceiveChanges)

        return () => {
            socket.off("receive-changes", handleReceiveChanges)
        }

    }, [delta])

    const getCodeFromDelta = (delta) => {
        if(delta == null || delta.ops.length == 0) {
            return "";
        } else {
            return delta.ops[0].insert;
        }
    }

    const handleCodeChange = (value, event) => {
        const newDelta = new Delta([{
            insert: value
        }]);

        const changes = delta.diff(newDelta);

        socket.emit("send-changes", changes);
        socket.emit("save-document", value);

        setDelta(newDelta)
        API.patchDocText(id, value)
            .then(response => {
            }, error => {
                console.log(error);
            })
    }

    const stubCallToCodeExecutor = () => {
        setTimeout(() => {
            setIsExecuting(false);
            setOutput("Hello World");
        }, 3000);
    }

    const toggleCodeExcecutingMode = () => {
        setShowOutput(true);
        setIsExecuting(true);
        setOutput("Compiling code...");
    }

    const onExecuteCode = () => {
        toggleCodeExcecutingMode();
        const code = getCodeFromDelta(delta)
        socket.emit("run-code", "", code)
    }

    useEffect(() => {
        if(socket == null) return;

        socket.on("code-execution-start", toggleCodeExcecutingMode)

        return () => {
            socket.off("code-execution-start", toggleCodeExcecutingMode);
        }
    })

    useEffect(() => {
        if(socket == null) return;

        const handleCodeExecuted = (result) => {
            if(!showOutput) {
                setShowOutput(true);
            }
            setIsExecuting(false);
            setOutput(result.output);
        }

        socket.on("code-execution-end", handleCodeExecuted)

        return () => {
            socket.off("code-execution-end", handleCodeExecuted);
        }
    })


    const onOutputClose = () => {
        if(!isExecuting) {
            setShowOutput(false);
        }
    }

    return (
        <FullContainer>
            <Header>
                <Button
                    type="ghost" 
                    shape="round" 
                    icon={isExecuting ? <LoadingOutlined/> : <PlayCircleFilled />} 
                    size="large"
                    label={isExecuting ? "Executing" : "Execute"}
                    onClick={onExecuteCode}
                    disabled={isExecuting}
                />
            </Header>
            <EditorDashboard
                code={getCodeFromDelta(delta)}
                onCodeChange={handleCodeChange}
                showOutput={showOutput}
                onOutputClose={onOutputClose}
                output={output}
            />
        </FullContainer>
    )
}

export default DocPage;