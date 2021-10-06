
import { useState } from "react";
import EditorDashboard from "../components/EditorDashboard";
import Header from "../common/Header";
import FullContainer from "../common/FullContainer";
import Button from "../components/Button";
import { PlayCircleFilled } from "@ant-design/icons";

const DocPage = () => {
    const [code, setCode] = useState("# type your python code here");
    const [showOutput, setShowOutput] = useState(false);

    const handleCodeChange = (value, event) => {
        setCode(value);
    }

    const onExecuteCode = () => {
        setShowOutput(!showOutput);
    }

    return (
        <FullContainer>
            <Header>
                <Button
                    type="ghost" 
                    shape="round" 
                    icon={<PlayCircleFilled />} 
                    size="large"
                    label="Execute"
                    onClick={onExecuteCode}
                />
            </Header>
            <EditorDashboard
                code={code}
                onCodeChange={handleCodeChange}
                showOutput={showOutput}
                onOutputClose={onExecuteCode}
            />
        </FullContainer>
    )
}

export default DocPage;