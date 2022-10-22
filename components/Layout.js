import Head from "next/head";
import Nav from "./Nav.js";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Glendale Soccer</title>
    </Head>

    <Nav />

    <main>
      <div>{children}</div>
    </main>
  </>
);
export default Layout;
