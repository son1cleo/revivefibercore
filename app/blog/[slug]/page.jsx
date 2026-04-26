import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllBlogPosts, getBlogBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Revive Fiber Core Blog`,
    description: post.excerpt
  };
}

export default function BlogPostPage({ params }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-wide text-olive">{post.category}</p>
      <h1 className="mt-3 text-4xl font-bold text-charcoal">{post.title}</h1>
      <p className="mt-3 text-sm text-charcoal/70">
        {new Date(post.date).toLocaleDateString()} · {post.author}
      </p>

      <div className="prose prose-slate mt-10 max-w-none prose-headings:text-charcoal prose-p:text-charcoal/85">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <Link href="/blog" className="mt-10 inline-block rounded-full border border-forest/30 px-5 py-2 text-sm font-medium text-forest hover:bg-forest/5">
        Back to Blog
      </Link>
    </article>
  );
}
