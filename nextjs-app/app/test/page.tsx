// src/app/test/page.tsx
import { sanityFetch } from "@/sanity/lib/live";

export default async function Page() {
  const { data: posts } = await sanityFetch({
    query: `*[_type == "page"] {
      ...
    }`,
  });

  return (
    <>
      <h1>
        Simple page to display post titles, stega overlay and inspect the
        requests generated. This text should not be overlayed.
      </h1>
      {posts.map((post: any) => (
        <ul style={{ margin: "1rem", listStyle: "disc" }}>
          <li key={post._id}>
            <p>{post.name}</p>
            <p>{post.heading}</p>
          </li>
        </ul>
      ))}
    </>
  );
}
