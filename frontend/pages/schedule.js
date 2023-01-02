import Layout from "../components/Layout.js";
import { useContext, useEffect, useState } from "react";
import { SiteStateContext } from "../context/SiteStateContext";

export default function schedule() {
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const [schedule, setSchedule] = useState();
  let url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/schedules?populate=*&filters[team][$eq]=${siteState.team}&filters[gender][$eq]=${siteState.gender}&sort[0]=year%3Adesc&pagination[pageSize]=1`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSchedule(data.data[0].attributes));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSchedule(data.data[0].attributes));
  }, [siteState]);

  if (!schedule) {
    return <div>Sorry, no schedule at this time</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl pt-6">{`${schedule.year} ${siteState.gender} ${siteState.team} Schedule`}</h1>
    </Layout>
  );
}
