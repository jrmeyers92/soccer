import Link from "next/link.js";
import Layout from "../components/Layout.js";
import { useRouter } from "next/router.js";
import { fetcher } from "../lib/api.js";
import { SiteStateProvider } from "../context/SiteStateContext.js";

const styles = {
  pageHeader: "text-2xl mb-4",
  table: "w-full px-12",
  tableRow: "",
  tableBodyRow: "hover:bg-gray-200",
  tableHeader: "p-2 text-left bg-primary-500 text-white italic font-semibold",
  tableData: "p-2 border border-gray-300",
  tableDate: "border-l-0",
  tableType: "border-r-0",
  link: "text-blue-900 underline",
};

export default function news({ articles }) {
  const { query } = useRouter();

  const listItems = articles.data.map((article, index) => (
    <tr key={index} className={`${styles.tableRow} ${styles.tableBodyRow}`}>
      <td className={`${styles.tableData} ${styles.tableDate}`}>
        {article.attributes.date}
      </td>
      <td className={styles.tableData}>
        <Link href={`/article/${article.id}`}>
          <a className={styles.link}>{article.attributes.title}</a>
        </Link>
      </td>
      <td className={`${styles.tableData} ${styles.tableType}`}>
        {article.attributes.type}
      </td>
    </tr>
  ));

  return (
    <Layout>
      <h2 className={styles.pageHeader}>Story Archives</h2>
      <section className="w-full">
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeader}>Posted</th>
              <th className={styles.tableHeader}>Headline</th>
              <th className={styles.tableHeader}>Category</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/articles?sort[0]=date%3ADesc`
  );

  return {
    props: {
      articles: articles,
    },
  };
}
