import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="rounded-2xl border border-forest/10 bg-white p-6 shadow-soft">
      <p className="text-xs uppercase tracking-wide text-olive">{post.category || "Insights"}</p>
      <h3 className="mt-2 text-xl font-semibold text-charcoal">{post.title}</h3>
      <p className="mt-2 text-sm text-charcoal/70">{new Date(post.date).toLocaleDateString()}</p>
      <p className="mt-3 text-sm text-charcoal/80">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-forest hover:underline">
        Read More
      </Link>
    </article>
  );
}
