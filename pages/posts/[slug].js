import Head from "next/head";
import { getPost, getSlugs } from "../../lib/posts";

export async function getStaticPaths() {
  const slugs = await getSlugs();
  return {
    // This will acept an array of objects.
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    // This is the same thatn above
    // paths: [
    //   { params: { slug: 'first-post'}}
    //   { params: { slug: 'second-post'}}
    // ]
    fallback: false,
  };
}

// This is the way to pass props into a page
// This function is run at the Server Side.
// So we can use any functionality offer by nodejs
export async function getStaticProps({ params: { slug } }) {
  console.log("[PostPage] getStaticProps():", slug);
  const post = await getPost(slug);
  return {
    props: { post },
  };
}

function PostPage({ post }) {
  console.log("[PostPage] render:", post);
  return (
    <>
      <Head>
        <title>{post.title} - My Blog</title>
      </Head>
      <main>
        <p>{post.date}</p>
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post.body }} />
      </main>
    </>
  );
}

export default PostPage;
