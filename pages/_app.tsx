import "antd/dist/antd.css";
import "../shared/styles/styles.scss";
import "highlight.js/styles/github.css";
import Head from "next/head";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import app from "../package.json";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { YMInitializer } from "react-yandex-metrika";

const { Header, Content, Footer } = Layout;

const tagManagerArgs = {
  gtmId: "GTM-MWPWFTP",
};

const YAmetrica = () => `<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(66221665, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/66221665" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->`;

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <Head>
        <title>Mock API | Schema generation tool</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/railscasts.css"
        />
        <meta
          name="google-site-verification"
          content="x4xXwn1gLN0qwxkx1lMzcbZ6M3Y2VMN9eUE7kkrtkPo"
        />
        <meta name="yandex-verification" content="70a1f32dfae2549f" />
      </Head>
      <Layout className="layout">
        <div dangerouslySetInnerHTML={{ __html: YAmetrica() }}></div>
        <Header>
          <Link href="/">
            <span className="logo mr-15 underline noselect pointer">
              Mock API | Schema generator
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
        Mock API v.{app.version} | REST API Placeholder |{" "}
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/Hennessy811/fake-api"
        >
          GitHub
        </a>
        |{" "}
        <a
          target="_blank"
          rel="noopener"
          href="mailto:mitia2022@gmail.com?subject=Mock REST API Generator question"
        >
          Contact me
        </a>{" "}
        | 2020
      </Footer>
    </>
  );
}
