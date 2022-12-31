import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import WidgetFooterLink from "./WidgetFooterLink";

const styles = {
  container: "w-full md:w-2/3 my-2 bg-white shadow-md",
  articlesWrapper: `bg-white`,
};

const NewsWidget = ({ articles }) => {
  const listItems = articles.map((article, index) =>
    index == 0 ? (
      <FeaturedArticle
        key={index}
        title={article.attributes.title}
        date={article.attributes.date}
        type={article.attributes.type}
        id={article.id}
        imageURL={`http://localhost:1337${article.attributes.mainPhoto.data.attributes.url}`}
      />
    ) : (
      <ArticleCard
        key={index}
        title={article.attributes.title}
        date={article.attributes.date}
        type={article.attributes.type}
        id={article.id}
        imageURL={`http://localhost:1337${article.attributes.mainPhoto.data.attributes.url}`}
      />
    )
  );

  return (
    <section className={styles.container}>
      <SectionHeading title="Latest News" />

      {listItems}

      <WidgetFooterLink text="View more headlines" theLink="/news" />
    </section>
  );
};

export default NewsWidget;
