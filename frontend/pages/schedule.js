import Layout from "../components/Layout.js";
import { useContext } from "react";
import { SiteStateContext } from "../context/SiteStateContext";

export default function schedule() {
  const [siteState, setSiteState] = useContext(SiteStateContext);

  return (
    <Layout>
      <h1 className="text-2xl pt-6"></h1>
    </Layout>
  );
}
