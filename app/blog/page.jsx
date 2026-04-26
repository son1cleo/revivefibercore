import BlogCard from "@/components/BlogCard";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Revive Fiber Core",
  description: "Read sustainability, recycling, and textile innovation insights from Revive Fiber Core."
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16">
      <h1 className="text-4xl font-bold text-charcoal">Insights & Updates</h1>
      <p className="mt-3 max-w-2xl text-charcoal/80">
        Practical notes on recycled fiber quality, circular manufacturing, and process innovation.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
