import Image from "next/image";
import Link from "next/link";
import Dummy from "../public/images/dummy.jpg";

const styles = {
  article:
    "flex odd:flex-row-reverse items-center py-4 border-t border-grey-400 px-2 md:px-4",
  imageWrapper: "hidden lg:inline-block",
  content: "flex flex-col items-start mx-4",
  blurb: "text-primary-500",
  title: "uppercase text-2xl font-bold cursor-pointer py-2",
};

const ArticleCard = ({ title, date, type, id, imageURL }) => {
  return (
    <article className={styles.article}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageURL}
          width={336}
          height={190}
          className={styles.image}
          objectFit="cover"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.blurb}>
          {type} | {date}
        </p>
        <h2 className={styles.title}>
          <a href="#">{title}</a>
        </h2>
        <Link href={`/article/${id}`}>
          <a className="btn-rounded">Read Article</a>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
