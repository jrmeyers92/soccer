import Head from "next/head";
import Nav from "./Nav.js";

const styles = {
  container: "px-2 md:px-4 lg:px-8 xl:px-12 py-4 bg-primary-600 min-h-screen",
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
