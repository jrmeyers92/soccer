import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import { formatDateDots } from "../lib/dateFormatter";

const styles = {
  container: "w-full md:w-2/3 my-2",
  headingWrapper: `bg-primary`,
  heading: `font-bold uppercase text-white text-lg px-4`,
  articlesWrapper: `bg-white`,
};

const NewsWidget = ({ articles }) => {
  const listItems = articles.data.map((article, index) =>
    index == 0 ? (
      <FeaturedArticle
        key={index}
        title={article.attributes.title}
        date={article.attributes.date}
        type={article.attributes.type}
        id={article.id}
      />
    ) : (
      <ArticleCard
        key={index}
        title={article.attributes.title}
        date={article.attributes.date}
        type={article.attributes.type}
        id={article.id}
      />
    )
  );

  return (
    <section className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Latest News</h2>
      </div>
      <div className={styles.articlesWrapper}>{/* <FeaturedArticle /> */}</div>

      {listItems}

      <div className="text-center w-full py-2 bg-gray-300 hover:text-white hover:bg-primary-500 duration-200 cursor-pointer">
        <Link href="/news">
          <a className="uppercase font-bold">View more headlines</a>
        </Link>
      </div>
    </section>
  );
};

export default NewsWidget;
