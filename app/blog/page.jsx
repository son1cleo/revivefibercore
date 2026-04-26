import BlogCard from "@/components/BlogCard";
import { getPublishedBlogs } from "@/lib/cms";

export const metadata = {
  title: "Blog | Revive Fiber Core",
  description: "Read sustainability, recycling, and textile innovation insights from Revive Fiber Core."
};

export default async function BlogPage() {
  const posts = await getPublishedBlogs();

  return (
    <div className="page-shell py-16">
      <div className="panel p-8 md:p-12">
        <p className="section-label">02 - Resources</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08] text-text-primary">Insights & Updates</h1>
        <p className="mt-3 max-w-2xl text-text-secondary">
        Practical notes on recycled fiber quality, circular manufacturing, and process innovation.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
