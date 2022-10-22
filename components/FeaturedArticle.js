import Image from "next/image";
import Dummy from "../public/images/dummy.jpg";

const styles = {
  featuredArticle: "py-2 relative px-2 md:px-4",
  featuredArticleImage: "absolute inset-0",
  featuredArticleTextWrapper:
    "absolute bottom-6 text-white px-2 md:px-4 flex flex-col sm:flex-row sm:justify-between sm:items-end space-x-4 w-full",
  articleTextLeft: "max-w-[70%]",
  title:
    "uppercase text-2xl md:text-3xl xl:text-5xl leading-[1.875rem] font-bold cursor-pointer",
  articleLink:
    "border border-white rounded-full px-4 py-2 absolute bottom-0 right-2 uppercase font-bold",
};

const FeaturedArticle = () => {
  return (
    <article className={styles.featuredArticle}>
      <Image
        src={Dummy}
        width={1080}
        height={810}
        className={styles.featuredArticleImage}
      />
      <div className={styles.featuredArticleTextWrapper}>
        <div className={styles.articleTextLeft}>
          <span>Men's Soccer | 10.21.2022</span>
          <h3 className={styles.title}>Boys Take Down Kickapoo In Overtime</h3>
        </div>
        <div>
          <a href="#" className={styles.articleLink}>
            Read Article
          </a>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
