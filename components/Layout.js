import Head from "next/head";
import Nav from "./Nav.js";

const styles = {
  container: "px-2 md:px-4 py-4 bg-slate-100 min-h-screen",
};

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Glendale Soccer</title>
    </Head>

    <Nav />

    <main>
      <div className={styles.container}>{children}</div>
    </main>
  </>
);
export default Layout;
