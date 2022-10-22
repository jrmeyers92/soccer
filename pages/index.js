import Layout from "../components/Layout.js";
import NewsWidget from "../components/NewsWidget.js";
import ScheduleWidget from "../components/ScheduleWidget.js";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-x-4">
        <NewsWidget />
        <ScheduleWidget />
      </div>
    </Layout>
  );
}
