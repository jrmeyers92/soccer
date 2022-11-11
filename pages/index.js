import Layout from "../components/Layout.js";
import NewsWidget from "../components/NewsWidget.js";
import ScheduleWidget from "../components/ScheduleWidget.js";
import { fetcher } from "../lib/api.js";
import { TeamProvider } from "../context/TeamContext.js";

export default function Home({ articles, games }) {
  return (
    <TeamProvider>
      <Layout>
        <div className="flex flex-col md:flex-row items-start gap-x-4">
          <NewsWidget articles={articles} />
          <ScheduleWidget games={games} />
        </div>
      </Layout>
    </TeamProvider>
  );
}

export async function getServerSideProps() {
  const articles = await fetcher(
    `http://localhost:1337/api/articles?sort[0]=date%3ADesc`
  );

  return {
    props: {
      articles: articles,
    },
  };
}
