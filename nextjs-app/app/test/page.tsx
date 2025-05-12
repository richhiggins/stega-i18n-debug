// src/app/test/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { PortableText, PortableTextBlock } from "next-sanity";

export default async function Page() {
  const { data: posts } = await sanityFetch({
    query: `*[_type == "page"] {
      ...
    }`,
  });

  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>{posts[0].name}</h1>
      <h2>{posts[0].heading}</h2>
      <h3>{posts[0].subheading}</h3>
      <br />
      <br />
      some pageBuilder components 👇
      {posts[0].pageBuilder &&
        posts[0].pageBuilder.map((post: any) =>
          post._type === "callToAction" ? (
            <div
              key={post._key}
              style={{
                margin: "1rem",
                padding: "1rem",
                border: "1px dashed pink",
              }}
            >
              <code style={{ color: "rebeccapurple" }}>{post._type}</code>
              <h4>{post.heading}</h4>
              <div>{post.text}</div>
              <button>{post.buttonText}</button>
            </div>
          ) : (
            <div
              key={post._key}
              style={{
                margin: "1rem",
                padding: "1rem",
                border: "1px dashed pink",
              }}
            >
              <code style={{ color: "rebeccapurple" }}>{post._type}</code>
              <h4>{post.heading}</h4>
              <h5>{post.subheading}</h5>
              <br />
              <br />
              <PortableText value={post.content as PortableTextBlock[]} />
            </div>
          )
        )}
      <pre>
        {
          //JSON.stringify(duplicatePosts, null, 2)
        }
      </pre>
      <br />
      <h2>More pages</h2>
      <ul style={{ margin: "1rem", listStyle: "disc" }}>
        {posts.map(
          (post: any) =>
            post.slug.current !== "test" && (
              <li key={post._id}>
                <p>{post.name}</p>
                <p>{post.heading}</p>
              </li>
            )
        )}
      </ul>
    </>
  );
}
