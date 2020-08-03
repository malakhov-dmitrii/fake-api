import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Input,
  Button,
  message,
  Tooltip,
  List,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  PlayCircleOutlined,
  SaveOutlined,
  DeliveredProcedureOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";

// TODO: Сохранение id схемы
// Страница схемы
// Переход на страницу с шаблонами

const Create = () => {
  const [schemaName, setSchemaName] = useState("");
  const [savedSchemaId, setSavedSchemaId] = useState("");
  const [sampleRes, setSampleRes] = useState(null);
  const [savedSchemas, setSavedSchemas] = useState([]);
  const [sampleJSON, setSampleJSON] = useState(
    JSON.stringify(
      {
        name: "{{name.firstName}} {{name.lastName}}",
        username: "{{internet.userName}}",
        email: "{{internet.email}}",
      },
      null,
      2
    )
  );

  const getSavedFromLocal = () => {
    const saved = localStorage.getItem("savedSchemas");
    let jsonSaved = [];
    if (saved) {
      jsonSaved = JSON.parse(saved);
      console.log(jsonSaved);
    }
    return jsonSaved;
  };

  useEffect(() => {
    let saved = getSavedFromLocal();
    setSavedSchemas(saved);
  }, []);

  const onSave = () => {
    try {
      const body = JSON.parse(sampleJSON);
      const savingSchema = { body, name: schemaName };
      fetch("/api/schema/new", {
        method: "POST",
        body: JSON.stringify(savingSchema),
      })
        .then((r) => r.json())
        .then((r) => {
          const existingItems = getSavedFromLocal();
          if (existingItems.length) {
            existingItems.push({ ...savingSchema, id: r.id });
            localStorage.setItem("savedSchemas", JSON.stringify(existingItems));
            setSavedSchemas(existingItems);
          } else {
            localStorage.setItem(
              "savedSchemas",
              JSON.stringify([{ ...savingSchema, id: r.id }])
            );
            setSavedSchemas([{ ...savingSchema, id: r.id }]);
          }
          setSavedSchemaId(r.id);
        })
        .catch(() => {
          message.error("Server error - Schema invalid");
        });
    } catch (error) {
      message.error("Error with parsing input JSON or Internal Server Error");
    }
  };

  const onTry = () => {
    try {
      const body = JSON.parse(sampleJSON);
      fetch("/api/schema/try", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((r) => r.json())
        .then((r) => {
          setSampleRes(r);
          setSampleJSON(JSON.stringify(body, null, 2));
        })
        .catch((e) => {
          message.error("Server error - Schema invalid");
        });
    } catch (error) {
      message.error("Error with parsing input JSON or Internal Server Error");
    }
  };

  return (
    <>
      <div className="title mt-30">
        <Typography.Title>Create your own schema</Typography.Title>
        <Typography.Paragraph>
          Mock API | Use for tutorials | Or just play around
        </Typography.Paragraph>
        <Typography.Paragraph>
          Please refer to{" "}
          <a href="http://marak.github.io/faker.js/">
            Faker documentation page
          </a>
          . All values are generated with "faker.fake()" method
        </Typography.Paragraph>
      </div>
      <Divider></Divider>

      <div className="mb-20">
        <Typography.Title level={4}>Enter schema name to save</Typography.Title>
        <Input
          value={schemaName}
          onChange={(e) => setSchemaName(e.target.value)}
          placeholder="Type here..."
          style={{ width: "300px" }}
        />

        <Button
          className="ml-15"
          type="primary"
          disabled={!schemaName.length}
          icon={<SaveOutlined />}
          onClick={onSave}
        >
          Save
        </Button>

        <Link
          href="/templates/custom/[id]"
          as={`/templates/custom/${savedSchemaId}`}
        >
          <Button
            className="ml-15"
            type="link"
            disabled={!savedSchemaId}
            icon={<PlayCircleOutlined />}
          >
            Explore this API
          </Button>
        </Link>
      </div>

      {savedSchemaId && (
        <div>
          <Typography.Paragraph>
            <b>Schema saved - id: {savedSchemaId}</b>
          </Typography.Paragraph>
        </div>
      )}

      <div className="d-flex">
        <div>
          <TextArea
            style={{ minHeight: "300px", width: 500 }}
            value={sampleJSON}
            onChange={(e) => {
              setSampleJSON(e.target.value);
            }}
          ></TextArea>
        </div>
        <div className="d-flex column m-15 jc-c">
          <Button
            className="mt-5 mb-5"
            type="default"
            onClick={() => onTry()}
            icon={<DeliveredProcedureOutlined />}
          >
            Try
          </Button>
        </div>

        <TextArea
          disabled
          style={{ minHeight: "300px", width: 500, color: "rgb(0 0 0, 0.65)" }}
          value={JSON.stringify(sampleRes || null, null, 2)}
        ></TextArea>
      </div>

      <Divider></Divider>
      <Typography.Title level={4} className="mt-15">
        Your last saved schemas{" "}
        <Tooltip title="This items are stored locally. Opens new tab">
          <QuestionCircleOutlined
            style={{ fontSize: "16px", color: "#aeaeae" }}
          />
        </Tooltip>
      </Typography.Title>

      <List
        size="small"
        bordered
        dataSource={savedSchemas}
        renderItem={(item) => (
          <List.Item>
            <Link
              href="/templates/custom/[id]"
              as={`/templates/custom/${item.id}`}
            >
              <a target="_blank" rel="noopener">
                {item.name}
              </a>
            </Link>
          </List.Item>
        )}
      />
      {/* {savedSchemas.map((i, idx) => (
        <div></div>
      ))} */}
    </>
  );
};

export default Create;
