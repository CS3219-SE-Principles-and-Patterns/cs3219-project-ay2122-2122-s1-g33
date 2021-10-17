
import { useEffect, useState } from "react";
import EditorDashboard from "../components/EditorDashboard";
import Header from "../common/Header";
import FullContainer from "../common/FullContainer";
import Button from "../components/Button";
import { LoadingOutlined, PlayCircleFilled } from "@ant-design/icons";
import API from "../util/API";
import { useParams } from "react-router";

const DocPage = () => {
    const [code, setCode] = useState("# type your python code here");
    const [showOutput, setShowOutput] = useState(false);
    const [output, setOutput] = useState("Compiling code...");
    const [isExecuting, setIsExecuting] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        API.getDoc(id)
            .then(response => {
                const {
                    docId,
                    docTitle,
                    docText,
                    userId
                } = response.data;
                setCode(docText);
            }, error => {
                console.log(error);
            })
    }, [])

    const stubCallToCodeExecutor = () => {
        console.log(`Executing code: ${code}`)
        setTimeout(() => {
            setIsExecuting(false);
            setOutput("Hello World");
        }, 3000);
    }

    const handleCodeChange = (value, event) => {
        setCode(value);
        API.patchDocText(id, value)
            .then(response => {
                console.log('code updated')
            }, error => {
                console.log(error);
            })
    }

    const onExecuteCode = () => {
        setShowOutput(true);
        setIsExecuting(true);
        setOutput("Compiling code...");
        stubCallToCodeExecutor();
    }

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
                code={code}
                onCodeChange={handleCodeChange}
                showOutput={showOutput}
                onOutputClose={onOutputClose}
                output={output}
            />
        </FullContainer>
    )
}

export default DocPage;