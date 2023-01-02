import Layout from "../components/Layout.js";
import NewsWidget from "../components/NewsWidget.js";
import ScheduleWidget from "../components/ScheduleWidget.js";
import { fetcher } from "../lib/api.js";
import { useState } from "react";

export default function Home({ articles, games }) {
  const [upcoming, setUpcoming] = useState(true);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start gap-x-4">
        <NewsWidget articles={articles} />
        <ScheduleWidget games={games} upcoming={upcoming} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const articles = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?sort[0]=date%3ADesc&populate=*`
  );

  return {
    props: {
      articles: articles.data,
    },
  };
}
