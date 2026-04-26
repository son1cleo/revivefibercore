import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="panel p-6">
      <p className="text-xs uppercase tracking-wide text-text-muted">{post.category || "Insights"}</p>
      <h3 className="mt-2 text-xl font-semibold text-text-primary">{post.title}</h3>
      <p className="mt-2 text-sm text-text-muted">{new Date(post.date).toLocaleDateString()}</p>
      <p className="mt-3 text-sm text-text-secondary">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-h">
        Read More
      </Link>
    </article>
  );
}
