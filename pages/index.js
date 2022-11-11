import Layout from "../components/Layout.js";
import NewsWidget from "../components/NewsWidget.js";
import ScheduleWidget from "../components/ScheduleWidget.js";
import { fetcher } from "../lib/api.js";
import { TeamProvider } from "../context/TeamContext.js";
import { GenderProvider } from "../context/GenderContext.js";
export default function Home({ articles, games }) {
  return (
    <TeamProvider>
      <GenderProvider>
        <Layout>
          <div className="flex flex-col md:flex-row items-start gap-x-4">
            <NewsWidget articles={articles} />
            <ScheduleWidget games={games} />
          </div>
        </Layout>
      </GenderProvider>
    </TeamProvider>
  );
}

export async function getServerSideProps() {
  const articles = await fetcher(
    `http://localhost:1337/api/articles?sort[0]=date%3ADesc`
  );

  // const games = await fetcher(
  //   `http://localhost:1337/api/schedules?populate=*&sort[0]=year%3Adesc&filters[gender][$eq]=Boys&filters[team][$eq]=JV`
  // );

  return {
    props: {
      articles: articles,
      // games: games.data[0].attributes.game,
    },
  };
}
