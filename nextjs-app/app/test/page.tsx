// src/app/test/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import {
  PortableTextMarkDefinition,
  ArbitraryTypedObject,
  PortableTextSpan,
} from "@portabletext/types";
import { PortableText, PortableTextBlock } from "next-sanity";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
  ReactPortal,
} from "react";

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
      {posts[0].pageBuilder.map(
        (post: {
          _type:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | Promise<AwaitedReactNode>
            | null
            | undefined;
          heading:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | Promise<AwaitedReactNode>
            | null
            | undefined;
          text:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<AwaitedReactNode>
            | null
            | undefined;
          buttonText:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<AwaitedReactNode>
            | null
            | undefined;
          subheading:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<AwaitedReactNode>
            | null
            | undefined;
          content: PortableTextBlock<
            PortableTextMarkDefinition,
            ArbitraryTypedObject | PortableTextSpan,
            string,
            string
          >[];
        }) =>
          post._type === "callToAction" ? (
            <div
              style={{
                margin: "1rem",
                padding: "1rem",
                border: "1px dashed pink",
              }}
              // @ts-ignore
              key={post._key}
            >
              <code style={{ color: "rebeccapurple" }}>{post._type}</code>
              <h4>{post.heading}</h4>
              <div>{post.text}</div>
              <button>{post.buttonText}</button>
            </div>
          ) : (
            <div
              style={{
                margin: "1rem",
                padding: "1rem",
                border: "1px dashed pink",
              }}
              // @ts-ignore
              key={post._key}
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
