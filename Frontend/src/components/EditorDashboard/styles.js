import styled from "styled-components";
import Editor from "@monaco-editor/react";
import { Drawer } from "antd";

export const DashboardWrapper = styled("div")`
    flex: 1;
    
`

export const StyledEditor = styled(Editor)`
    // max-width: 1200px;
    // margin-right: auto;
    // margin-left: auto;
    // position: relative;
    // border-color: red;
    // border-style: solid;
`

export const DrawWrapper = styled("div")`
    height: 100%;
    position: relative;
    overflow: hidden;
    color: white;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
`

export const StyledDrawer = styled(Drawer)`
    position: absolute;
`

export const Output = styled("Div")`
    background: #222221;
    border-radius: 8px;
    height: 100%;
    padding: 30px;
`

export const DrawerTitle = styled("h2")`
    color: white;
    overflow: scroll;

`