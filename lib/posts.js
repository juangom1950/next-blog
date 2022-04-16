// We use a lib folder at the top-level of the project that contains any code that's
// not specific to pages or other visual components.

// We are importing this functions from Nodejs
import { readdir, readFile } from "fs/promises";
// matter explanation: https://www.npmjs.com/package/gray-matter
import matter from "gray-matter";
// With this library we can generate html from marked stream.
import marked from "marked";

export async function getPost(slug) {
  // A URL slug is the part of the URL after the last backslash
  const source = await readFile(`content/posts/${slug}.md`, "utf8");
  const {
    data: { date, title },
    content,
  } = matter(source);
  const body = marked(content);
  return { date, title, body };
}

export async function getPosts() {
  const slugs = await getSlugs();
  const posts = [];
  for (const slug of slugs) {
    const post = await getPost(slug);
    // we use the spread operator here.
    posts.push({ slug, ...post });
  }
  return posts;
}

export async function getSlugs() {
  const suffix = ".md";
  // Get the list of files
  const files = await readdir("content/posts");
  return files
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.slice(0, -suffix.length));
}
