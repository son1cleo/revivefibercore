import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPublishedBlogBySlug } from "@/lib/cms";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Revive Fiber Core Blog`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="page-shell py-16">
      <div className="mx-auto max-w-5xl">
        <p className="section-label">Article / {post.category}</p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.7rem)] leading-[1.08] text-text-primary">{post.title}</h1>
        <p className="mt-3 text-sm text-text-secondary">
        {new Date(post.date).toLocaleDateString()} · {post.author}
        </p>

        <div className="prose mt-10 max-w-3xl prose-headings:font-display prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-a:text-accent">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <Link href="/blog" className="btn-ghost mt-10 inline-block">
          Back to Blog
        </Link>
      </div>
    </article>
  );
}
