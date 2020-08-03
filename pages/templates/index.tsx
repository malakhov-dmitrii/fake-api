import React, { useState } from "react";
import { Typography, Divider, Row, Col, Card, Input, Button, List } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SearchOutlined, CodeFilled } from "@ant-design/icons";
import Link from "next/link";

const usersExample = `
[
  {
    "id": 0,
    "name": "Lawson Mayert",
    "username": "Bonnie_Denesik",
    "email": "Lina.Fadel@yahoo.com",
    "address": {
      "street": "Melba Bridge",
      "suite": "Suite 111",
      "city": "Selenaberg",
      "zipcode": "43724",
      "geo": {
        "lat": "-46.3089",
        "lng": "45.5107"
      }
    },
    "phone": "(695) 588-3754 x548",
    "website": "marc.info",
    "company": {
      "name": "Cremin, Gottlieb and Pacocha",
      "catchPhrase": "Switchable impactful paradigm",
      "bs": "vertical deploy architectures"
    }
  },
]`;

const todosExample = `
[
  {
    "id": 0,
    "userId": 99633,
    "title": "payment Place",
    "completed": true
  },
  {
    "id": 1,
    "userId": 84942,
    "title": "Rand Loti Internal e-markets Tasty",
    "completed": true
  },
  {
    "id": 2,
    "userId": 60325,
    "title": "Unbranded Savings Account transition neutral",
    "completed": false
  },
]`;

const postsExample = `
[
  {
    "id": 0,
    "userId": 3197,
    "title": "Clothing Legacy Identity",
    "body": "Dolorem aspernatur quia aut tempore repellat. Culpa et magni provident quisquam fugiat provident. Nisi deserunt modi omnis odit impedit."
  },
  {
    "id": 1,
    "userId": 89292,
    "title": "copy models engineer overriding",
    "body": "Velit veniam illum animi temporibus. Earum sapiente in provident quia. Possimus autem ut. Dolores necessitatibus odit."
  },
  {
    "id": 2,
    "userId": 90854,
    "title": "Wooden Checking Account Cambridgeshire",
    "body": "Enim molestias accusamus debitis eum fugit. Molestiae ut quo odio molestias est temporibus. Cum dolorem sapiente. Est aspernatur magni ea et excepturi est ut."
  },
]`;

const examplesList = [
  { title: "Users", content: usersExample },
  { title: "Todos", content: todosExample },
  { title: "Posts", content: postsExample },
];

const Templates = () => {
  const [nameOrId, setNameOrId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const onFind = () => {
    fetch(`/api/schema/find?nameOrId=${nameOrId}`)
      .then((r) => r.json())
      .then((r) => setSearchResult(r));
  };
  return (
    <>
      <div className="title mt-30">
        <Typography.Title>Ready to use templates</Typography.Title>
        <Typography.Paragraph>
          All data is generated with <b>faker</b> package on each request
        </Typography.Paragraph>
      </div>
      <Divider></Divider>
      <div>
        <Typography.Title level={2}>
          Find custom schema by <span style={{ fontWeight: 100 }}>id</span> or{" "}
          <span style={{ fontWeight: 100 }}>name</span>
        </Typography.Title>

        <div className="d-flex">
          <Input
            size="large"
            placeholder="Enter id or name"
            value={nameOrId}
            onChange={(e) => setNameOrId(e.target.value)}
          />
          <Button
            size="large"
            className="ml-15"
            type="primary"
            onClick={onFind}
            disabled={!nameOrId.length}
            icon={<SearchOutlined />}
          >
            Find
          </Button>
        </div>

        {searchResult && (
          <div className="mt-5">
            {!searchResult.error ? (
              <>
                Go to the page:{" "}
                <Link
                  href="/templates/custom/[id]"
                  as={`/templates/custom/${searchResult.schema._id}`}
                >
                  <a target="_blank" rel="noopener">
                    {searchResult.schema.name}
                  </a>
                </Link>
              </>
            ) : (
              "Nothing found"
            )}
          </div>
        )}
      </div>
      <Divider></Divider>
      <div>
        <Typography.Title level={2}>Template resourses</Typography.Title>
      </div>
      <div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={examplesList}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <div className="d-flex ai-c jc-sb">
                    <div>{item.title}</div>
                    <Link
                      href="/templates/custom/[id]"
                      as={`/templates/custom/${item.title}`}
                    >
                      <a target="_blank" rel="noopener">
                        <Button icon={<CodeFilled />} type="link">
                          Explore
                        </Button>
                      </a>
                    </Link>
                  </div>
                }
              >
                {" "}
                <div className="templateCardContent">
                  <SyntaxHighlighter language="json" style={okaidia}>
                    {item.content}
                  </SyntaxHighlighter>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default Templates;
