import Layout from "../components/Layout.js";
import NewsWidget from "../components/NewsWidget.js";
import ScheduleWidget from "../components/ScheduleWidget.js";
import { fetcher } from "../lib/api.js";

export default function Home({ articles }) {
  console.log(articles);
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-x-4">
        <NewsWidget articles={articles} />
        <ScheduleWidget />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await fetcher(
    `http://localhost:1337/api/articles?sort[0]=date%3ADesc`
  );

  return {
    props: {
      articles: articles,
    },
  };
}
