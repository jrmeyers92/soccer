import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import Link from "next/link";

const styles = {
  container: "w-full md:w-2/3 my-2",
  headingWrapper: `bg-primary`,
  heading: `font-bold uppercase text-white text-lg px-4`,
  articlesWrapper: `bg-white`,
};

const NewsWidget = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Latest News</h2>
      </div>
      <div className={styles.articlesWrapper}>
        <FeaturedArticle />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
      <Link href="/news">
        <div className="text-center w-full py-2 bg-gray-300 hover:text-white hover:bg-primary-500 duration-200 cursor-pointer">
          <a className="uppercase font-bold">View more headlines</a>
        </div>
      </Link>
    </section>
  );
};

export default NewsWidget;
