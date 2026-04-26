import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import { getAdminBlogById } from "@/lib/cms";

export default async function AdminEditBlogPage({ params }) {
  const { id } = await params;
  const post = await getAdminBlogById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <p className="section-label">Admin / Blogs</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Edit Blog Post</h1>
      <p className="mt-2 text-text-secondary">Update content, metadata, or publish status.</p>
      <div className="mt-6">
        <BlogEditor post={post} />
      </div>
    </div>
  );
}
