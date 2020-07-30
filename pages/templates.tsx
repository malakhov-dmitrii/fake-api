import React from "react";
import { Typography, Divider } from "antd";

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
    </>
  );
};

export default Templates;
