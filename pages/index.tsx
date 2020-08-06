import { Typography, Divider, Button } from "antd";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Home() {
  const [showExample, setShowExample] = useState(false);
  const [code, setCode] = useState("");
  useEffect(() => {
    const codeStr = `fetch("${location.origin}/template/todos") 
    .then(r => r.json()) 
    .then(json => console.log(json))`;
    setCode(codeStr);
  }, []);

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
        <Typography.Title>Mock API</Typography.Title>
        <Typography.Paragraph>
          Mock Online REST API for Testing and Prototyping
        </Typography.Paragraph>
        <Typography.Paragraph>
          Create and share your own schema!
        </Typography.Paragraph>
        <Typography.Paragraph>
          <b>Inspired by JSONPlaceholder</b>
        </Typography.Paragraph>
        <Typography.Paragraph>
          All data is generated with{" "}
          <a href="https://github.com/Marak/Faker.js#readme">faker</a> package
          on each request
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
