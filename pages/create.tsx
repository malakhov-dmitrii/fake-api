import React, { useState, FC, useReducer, useEffect } from "react";
import {
  Typography,
  Divider,
  Tree,
  Input,
  Select,
  Button,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";

// TODO: Сохранение id схемы
// Страница схемы
// Переход на страницу с шаблонами

const Create = () => {
  const [sampleRes, setSampleRes] = useState(null);
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
      message.error("Error with parsing input JSON");
    }
  };

  return (
    <>
      <div className="title mt-30">
        <Typography.Title>Create your own schema</Typography.Title>
        <Typography.Paragraph>
          Mock API | Use for tutorials | Or just play around
        </Typography.Paragraph>
      </div>
      <Divider></Divider>

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
          <Button className="mt-5 mb-5" type="default" onClick={() => onTry()}>
            Try
          </Button>
          <Button className="mt-5 mb-5" type="primary" disabled>
            Save
          </Button>
        </div>

        <TextArea
          disabled
          style={{ minHeight: "300px", width: 500, color: "rgb(0 0 0, 0.65)" }}
          value={JSON.stringify(sampleRes || null, null, 2)}
        ></TextArea>
      </div>

      {/* <Tree showLine treeData={treeData} /> */}
    </>
  );
};

export default Create;
