import {
    ListWrapper,
    StyledList
} from "./styles";
import { List, Avatar, Skeleton, PageHeader } from 'antd';
import Button from "../Button";
import { PlusOutlined } from "@ant-design/icons";

const DocsList = () => {

    const list = [
        {
            title: "Doc Title 1",
            description: "Doc id 1",
            link: "http://localhost:3000/doc/id"
        },
        {
            title: "Doc Title 2",
            description: "Doc id 1",
            link: "http://localhost:3000/doc/id"
        },
        {
            title: "Doc Title 3",
            description: "Doc id 1",
            link: "http://localhost:3000/doc/id"
        }
    ]

    return (
        <ListWrapper>
            <PageHeader
                title={"Your Docs"}
                extra={[
                    <Button
                        type="ghost" 
                        shape="round"
                        size="medium"
                        onClick={() => {}}
                        label="Create"
                        icon={<PlusOutlined />}
                    />
                ]}
            />
            <StyledList
                size="large"
                dataSource={list}
                itemLayout="horizontal"
                renderItem={item => {

                    return (
                        <List.Item
                            actions={[<a key="list-loadmore-edit">copy link</a>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://cdn2.iconfinder.com/data/icons/document-20/100/Html-512.png"/>
                                    }
                                    title={<a href={item.link} target="_blank">{item.title}</a>}
                                    description={item.description}
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