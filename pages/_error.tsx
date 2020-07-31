import { Typography, Button } from "antd";

const Error = ({ statusCode }) => {
  const errorMessage = () => {
    switch (statusCode) {
      case 404:
        return (
          <>
            <Typography.Paragraph>Page not found</Typography.Paragraph>
            <Button size="small" type="primary" href="/">
              Go home
            </Button>
          </>
        );
      case 500:
        return (
          <Typography.Paragraph>Internal server error</Typography.Paragraph>
        );
      default:
        return <Typography.Paragraph>Some client error</Typography.Paragraph>;
    }
  };
  return (
    <div className="text-center mt-50">
      <Typography.Title>{statusCode}</Typography.Title>

      {errorMessage()}
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
