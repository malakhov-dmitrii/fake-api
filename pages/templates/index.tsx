import React from "react";
import { Typography, Divider, Row, Col, Card } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

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

const Templates = () => {
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
        <Typography.Title level={2}>Find custom schema by id</Typography.Title>
      </div>
      <Divider></Divider>
      <div>
        <Typography.Title level={2}>Template resourses</Typography.Title>
      </div>
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Users">
              <div className="templateCardContent">
                <SyntaxHighlighter language="json" style={okaidia}>
                  {usersExample}
                </SyntaxHighlighter>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Todos">
              <div className="templateCardContent">
                <SyntaxHighlighter language="json" style={okaidia}>
                  {todosExample}
                </SyntaxHighlighter>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Posts">
              <div className="templateCardContent">
                <SyntaxHighlighter language="json" style={okaidia}>
                  {postsExample}
                </SyntaxHighlighter>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Templates;
