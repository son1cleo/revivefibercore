import Link from "next/link";
import BlogList from "@/components/admin/BlogList";
import { getAllAdminBlogs } from "@/lib/cms";

export default async function AdminBlogsPage() {
  const posts = await getAllAdminBlogs();

  return (
    <main className="page-shell py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Admin / Blogs</p>
            <h1 className="mt-2 font-display text-4xl text-text-primary">Blog Posts</h1>
            <p className="mt-2 text-sm text-text-secondary">Create, edit and remove published articles.</p>
          </div>
          <Link href="/admin/blogs/new" className="btn-primary">
            New Post
          </Link>
        </div>

        <div className="mt-8">
          <BlogList posts={posts} />
        </div>
      </div>
    </main>
  );
}
