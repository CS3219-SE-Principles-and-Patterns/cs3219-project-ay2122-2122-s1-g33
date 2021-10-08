import {
    DashboardWrapper,
    StyledEditor,
    DrawWrapper,
    StyledDrawer,
    Output,
    DrawerTitle
} from './styles';

const EditorDashboard = ({
    code,
    onCodeChange,
    showOutput,
    onOutputClose,
    output
}) => {
    const drawerStyle = {
        color: "white",
        background: "#343a40",
        padding: "10px"
    }

    return (
        <DashboardWrapper>
            <DrawWrapper>
                <StyledEditor
                    defaultLanguage="python"
                    value={code}
                    onChange={onCodeChange}
                    theme="vs-dark"
                    height="99%"
                />
                <StyledDrawer
                    placement="bottom"
                    closable={true}
                    onClose={onOutputClose}
                    visible={showOutput}
                    getContainer={false}
                    drawerStyle={drawerStyle}
                    headerStyle={{color: "white"}}
                    >
                    <Output>
                        <pre>{output}</pre>
                    </Output>
                </StyledDrawer>
            </DrawWrapper>
        </DashboardWrapper>
    )
}

export default EditorDashboard;