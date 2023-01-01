import Image from "next/image";
import Dummy from "../public/images/dummy.jpg";

const styles = {
  featuredArticle: "py-2 relative px-2 md:px-4 md:py-4",
  featuredArticleImage: "absolute inset-0 w-full",
  featuredArticleTextWrapper:
    "absolute text-white top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:bottom-6 px-2 md:px-4 flex flex-col items-center justify-center md:flex-row md:justify-between md:items-end max-w-[95%]",
  articleTextLeft: "max-w-[90%] md:max-w-[65%] lg:max-w-[70%] mb-6 md:mb-0",
  title:
    "uppercase text-3xl md:text-3xl xl:text-4xl leading-[1.875rem] font-bold cursor-pointer",
  linkWrapper: "md:mb-3",
};

const FeaturedArticle = ({ title, date, type, imageURL, id }) => {
  return (
    <article className={styles.featuredArticle}>
      <Image
        src={imageURL}
        width={1080}
        height={810}
        className={styles.featuredArticleImage}
      />
      <div className={styles.featuredArticleTextWrapper}>
        <div className={styles.articleTextLeft}>
          <span>
            {type} | {date}
          </span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.linkWrapper}>
          <a href={`/article/${id}`} className="btn-rounded">
            Read Article
          </a>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
