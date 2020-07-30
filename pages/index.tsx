import Head from "next/head";
import { Layout, Menu, Breadcrumb, Typography, Divider, Button } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useState } from "react";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { T } from "antd/lib/upload/utils";

const { Header, Content, Footer } = Layout;

export default function Home() {
  const [showExample, setShowExample] = useState(false);
  useEffect(() => {}, []);

  const code = `fetch("https://projectname/template/todos") 
  .then(r => r.json()) 
  .then(json => console.log(json))`;

  const response = `[
  {
    "id": 0,
    "userId": 62519,
    "title": "Clothing Taiwan Devolved Avon Future",
    "completed": true
  },
  ...
]`;

  return (
    <>
      <div className="title mt-30">
        <Typography.Title>FAKE API</Typography.Title>
        <Typography.Paragraph>
          Fake Online REST API for Testing and Prototyping
        </Typography.Paragraph>
        <Typography.Paragraph>
          Create and share your own schema!
        </Typography.Paragraph>
        <Typography.Paragraph>
          <b>Inspired by JSONPlaceholder</b>
        </Typography.Paragraph>
        <Typography.Paragraph>
          All data is generated with <b>faker</b> package on each request
        </Typography.Paragraph>
      </div>
      <Divider></Divider>
      <div className="intro">
        <Typography.Title level={2}>Intro</Typography.Title>
        <Typography.Text>
          Great fit for tutorials, code samples, and mocking simple custom
          API`s.
          <br />
          For advanced JSON generation you can try
        </Typography.Text>{" "}
        <Typography.Link href="https://www.json-generator.com/">
          this project
        </Typography.Link>
      </div>
      <Divider></Divider>
      <div className="example">
        <Typography.Title level={2}>
          Example with existing template
        </Typography.Title>
        <Typography.Text>
          You can make this request in the console or from any site:
        </Typography.Text>
        <div className="mt-10 mb-10">
          <SyntaxHighlighter
            language="javascript"
            lineNumberStyle={{
              userSelect: "none",
            }}
            style={okaidia}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <Button type="primary" onClick={() => setShowExample(true)}>
          Try it!
        </Button>

        <div className="mt-15">
          <SyntaxHighlighter
            lineNumberStyle={{
              userSelect: "none",
            }}
            language="json"
            style={okaidia}
          >
            {showExample ? response : "\n \n \n \n"}
          </SyntaxHighlighter>
        </div>
      </div>
      <Divider></Divider>
      <Typography.Title level={2}>
        Example creating your own schema
      </Typography.Title>
      <Typography.Paragraph>
        1. You need to create your schema on this page
      </Typography.Paragraph>
      <Typography.Paragraph>
        2. You will receive unique ID of template, so you can start making
        requests. You can share URL, so anyone can use schema you defined
      </Typography.Paragraph>
      <Typography.Paragraph>
        Here is brief GIF example how to get started with it:
      </Typography.Paragraph>
    </>
  );
}
