import { fetcher } from "../../lib/api.js";
import Image from "next/image.js";

const article = ({ article }) => {
  const imageURL = `http://localhost:1337${article.data.attributes.mainPhoto.data.attributes.url}`;
  return (
    <article>
      <div className="relative w-full h-screen">
        <Image src={imageURL} layout="fill" objectFit="cover" />
      </div>

      <h1>{article.data.attributes.title}</h1>
      <p>{article.data.attributes.article}</p>
    </article>
  );
};

export default article;

export async function getServerSideProps(context) {
  const article = await fetcher(
    `http://localhost:1337/api/articles/${context.query.id}?populate=*`
  );

  return {
    props: {
      article,
    },
  };
}
