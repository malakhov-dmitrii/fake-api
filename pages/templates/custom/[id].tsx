import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Typography, Divider, Button, message } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CustomTemplate = (props) => {
  const { id } = props;
  const [schemaDetails, setSchemaDetails] = useState(null);
  const [getReponseExample, setGetReponseExample] = useState(null);
  const [requestExampleURL, setRequestExampleURL] = useState("");

  const getSchemaData = () => {
    fetch(`/api/schema/details/${id}`)
      .then((r) => r.json())
      .then((r) => {
        setSchemaDetails(r);
      });
  };

  useEffect(() => {
    getSchemaData();

    const baseURL = location?.origin || "https://fake-api-builder.vercel.app/";
    const requestURL = `${baseURL}/api/schema/get/${id}`;
    setRequestExampleURL(requestURL);
  }, []);

  const reqExampleStr = `fetch("${requestExampleURL}") 
  .then(r => r.json()) 
  .then(json => console.log(json))`;

  const tryGET = () => {
    fetch(requestExampleURL)
      .then((r) => r.json())
      .then((json) => setGetReponseExample(json));
  };

  return (
    <div>
      <Typography.Title level={4}>ID: {id}</Typography.Title>
      {schemaDetails && (
        <>
          <Typography.Title>
            {schemaDetails.name} <span style={{ fontWeight: 100 }}>schema</span>
          </Typography.Title>

          <div>
            <div className="mt-15">
              <SyntaxHighlighter language="json" style={okaidia}>
                {JSON.stringify(schemaDetails.body, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
          <Divider></Divider>

          <div>
            <Typography.Title level={3}>Supported methods</Typography.Title>
          </div>

          <div>
            <Typography.Title level={4}>GET</Typography.Title>

            <div className="">
              <div>
                <div>Request example:</div>
                <div>
                  <SyntaxHighlighter language="javascript" style={okaidia}>
                    {reqExampleStr}
                  </SyntaxHighlighter>
                </div>
              </div>
              <div className="mt-15 mb-15">
                <Button type="primary" onClick={() => tryGET()}>
                  Try GET
                </Button>
                <CopyToClipboard
                  text={reqExampleStr}
                  onCopy={() =>
                    message.success("Copied GET example to the clipboard")
                  }
                >
                  <Button type="dashed" className="ml-15">
                    Copy example to clipboard
                  </Button>
                </CopyToClipboard>
              </div>
              {getReponseExample && (
                <div>
                  <div>Response:</div>
                  <div>
                    <SyntaxHighlighter language="javascript" style={okaidia}>
                      {JSON.stringify(getReponseExample, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context.params);

  return {
    props: context.params, // will be passed to the page component as props
  };
}

export default CustomTemplate;
