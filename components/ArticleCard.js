import Image from "next/image";
import Dummy from "../public/images/dummy.jpg";

const styles = {
  article:
    "flex odd:flex-row-reverse space-x-4 items-center py-4 border-t border-grey-400 px-2 md:px-4",
  imageWrapper: "hidden lg:inline-block",
  content: "flex flex-col items-start",
  blurb: "text-primary-700",
  title: "uppercase text-2xl font-bold cursor-pointer py-2",
  link: "border border-black rounded-full px-4 py-2 uppercase font-bold",
};

const ArticleCard = () => {
  return (
    <article className={styles.article}>
      <div className={styles.imageWrapper}>
        <Image src={Dummy} width={336} height={190} className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.blurb}>Men's Soccer | 10.19.2021</p>
        <h2 className={styles.title}>
          <a href="#">
            THORNTON, FRANKLIN DAZZLE FOR DRAKE IN 2-0 WIN OVER BRADLEY
          </a>
        </h2>
        <a href="#" className={styles.link}>
          Read Article
        </a>
      </div>
    </article>
  );
};

export default ArticleCard;
