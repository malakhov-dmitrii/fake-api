import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Typography, Divider, Button, message } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const usersTemplate = [
  100,
  {
    id: "{{random.number}}",
    name: "{{name.firstName}} {{name.lastName}}",
    username: "{{internet.userName}}",
    email: "{{internet.email}}",
    address: {
      street: "{{address.streetName}}",
      suite: "{{address.secondaryAddress}}",
      city: "{{address.city}}",
      zipcode: "{{address.zipCode}}",
      geo: {
        lat: "{{address.latitude}}",
        lng: "{{address.longitude}}",
      },
    },
    phone: "{{phone.phoneNumber}}",
    website: "{{internet.domainName}}",
    company: {
      name: "{{company.companyName}}",
      catchPhrase: "{{company.catchPhrase}}",
      bs: "{{company.bs}}",
    },
  },
];

const todosTemplate = [
  100,
  {
    id: "{{random.number}}",
    userId: "{{random.number}}",
    title: "{{random.words(3)}}",
    completed: "{{random.boolean}}",
  },
];

const postsTemplate = [
  100,
  {
    id: "{{random.number}}",
    userId: "{{random.number}}",
    title: "{{random.words(3)}}",
    body: "{{lorem.paragraph}}",
  },
];

const isTemplatePage = (id) => {
  return id === "Users" || id === "Todos" || id === "Posts";
};

const CustomTemplate = (props) => {
  const { id } = props;
  const [schemaDetails, setSchemaDetails] = useState(null);
  const [getResponseExample, setGetResponseExample] = useState(null);
  const [requestExampleURL, setRequestExampleURL] = useState("");

  const handleTemplatePage = () => {
    switch (id) {
      case "Users":
        setSchemaDetails({
          name: "Users",
          body: usersTemplate,
          availableParams: ["sortBy", "sort", "limit", "userId"],
          getByIdAvailable: true,
        });
        break;
      case "Posts":
        setSchemaDetails({
          name: "Posts",
          body: postsTemplate,
          availableParams: ["sortBy", "sort", "limit", "userId"],
          getByIdAvailable: true,
        });
        break;
      case "Todos":
        setSchemaDetails({
          name: "Todos",
          body: todosTemplate,
          availableParams: ["sortBy", "sort", "limit", "userId"],
          getByIdAvailable: true,
        });
        break;
      default:
        break;
    }
  };

  const getSchemaData = () => {
    if (isTemplatePage(id)) {
      handleTemplatePage();
    } else {
      fetch(`/api/schema/details/${id}`)
        .then((r) => r.json())
        .then((r) => {
          setSchemaDetails(r);
        });
    }
  };

  useEffect(() => {
    getSchemaData();

    const baseURL = location?.origin || "https://fake-api-builder.vercel.app/";
    let requestURL = `${baseURL}/api/schema/get/${id.toLowerCase()}`;

    if (isTemplatePage(id)) {
      requestURL = `${baseURL}/api/template/${id.toLowerCase()}`;
    }

    setRequestExampleURL(requestURL);
  }, []);

  const reqExampleStr = `fetch("${requestExampleURL}") 
  .then(r => r.json()) 
  .then(json => console.log(json))`;

  const reqGetOneByIdExampleStr = `fetch("${requestExampleURL}/1") 
  .then(r => r.json()) 
  .then(json => console.log(json))`;

  const tryGET = () => {
    fetch(requestExampleURL)
      .then((r) => r.json())
      .then((json) => setGetResponseExample(json));
  };

  console.log(schemaDetails);

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
              {getResponseExample && (
                <div>
                  <div>Response:</div>
                  <div style={{ maxHeight: "500px", overflow: "scroll" }}>
                    <SyntaxHighlighter language="javascript" style={okaidia}>
                      {JSON.stringify(getResponseExample, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}
            </div>

            <Divider></Divider>

            {schemaDetails.getByIdAvailable && (
              <>
                <div>
                  <Typography.Title level={4}>
                    Get one item by ID
                  </Typography.Title>

                  <div>
                    <div>Request example:</div>
                    <div>
                      <SyntaxHighlighter language="javascript" style={okaidia}>
                        {reqGetOneByIdExampleStr}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
                <Divider></Divider>
              </>
            )}

            {schemaDetails.availableParams?.length && (
              <div>
                <Typography.Title level={4}>
                  Available filter options
                </Typography.Title>
                {schemaDetails.availableParams.map((i) => {
                  return <div>{i}</div>;
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.params, // will be passed to the page component as props
  };
}

export default CustomTemplate;
