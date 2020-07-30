import "antd/dist/antd.css";
import "../shared/styles/styles.scss";
import "highlight.js/styles/github.css";
import Head from "next/head";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import app from "../package.json";

const { Header, Content, Footer } = Layout;
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fake API | Schema generation tool</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/railscasts.css"
        />
      </Head>
      <Layout className="layout">
        <Header>
          <Link href="/">
            <span className="logo mr-15 underline noselect pointer">
              Fake API | Schema generator
            </span>
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[router.route]}
          >
            <Menu.Item key="/">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/templates">Template examples</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/create">Create</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="pl-50 pr-50 mt-30">
          <div className="container">
            <div className="site-layout-content">
              <Component {...pageProps} />
            </div>
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Fake API v.{app.version} | REST API Placeholder | GitHub | 2020
      </Footer>
    </>
  );
}
