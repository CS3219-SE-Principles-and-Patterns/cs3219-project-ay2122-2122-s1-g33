import { List, Avatar, Skeleton, PageHeader } from 'antd';
import Button from "../Button";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from '../../util/API';
import constants from '../../common/constants';
import {
    ListWrapper,
    StyledList
} from "./styles";

const DocsList = ({
    userId,
}) => {
    const [docsList, setDocsList] =  useState([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const history = useHistory();

    const onClickCreate = () => {
        setIsButtonLoading(true);
        API.createDoc(userId, constants.defaultCode, "Doc Program")
            .then(response => {
                setIsButtonLoading(false);
                history.push(`/doc/${response.data.docId}`)
            }, error => {
                setIsButtonLoading(false);
                console.log(error)
            })
    }

    const onCopyLink = (link) => {
        navigator.clipboard.writeText(link)
    }

    useEffect(() => {
        API.getUserDocs(userId)
            .then(response => {
                const docs = response.data.map((doc) => {
                    const {
                        docid,
                        doctitle,
                    } = doc;
                    return {
                        title: doctitle,
                        id: docid,
                        link: `http://${process.env.REACT_APP_WEBSITE_URL}/doc/${docid}`
                    }
                });

                setDocsList(docs);
            }, error => {
                console.log(error)
            })
    }, []);

    return (
        <ListWrapper>
            <PageHeader
                title={"Your Docs"}
                extra={[
                    <Button
                        type="ghost" 
                        shape="round"
                        size="medium"
                        onClick={() => onClickCreate()}
                        label="Create"
                        icon={<PlusOutlined />}
                        loading={isButtonLoading}
                    />
                ]}
            />
            <StyledList
                size="large"
                dataSource={docsList}
                itemLayout="horizontal"
                renderItem={item => {

                    return (
                        <List.Item
                            actions={[
                            <a 
                                onClick={() => onCopyLink(item.link)}
                                key="list-loadmore-edit">
                                copy link
                            </a>
                        ]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://cdn2.iconfinder.com/data/icons/document-20/100/Html-512.png"/>
                                    }
                                    title={<a href={item.link} target="_blank">{item.title}</a>}
                                    description={item.id}
                                />
                            </Skeleton>
                        </List.Item>
                    )
                }}
            />
        </ListWrapper>
    )
}

export default DocsList;