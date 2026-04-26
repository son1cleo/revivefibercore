import BlogEditor from "@/components/admin/BlogEditor";

export default function AdminNewBlogPage() {
  return (
    <div>
      <p className="section-label">Admin / Blogs</p>
      <h1 className="mt-2 font-display text-3xl text-text-primary">Create Blog Post</h1>
      <p className="mt-2 text-text-secondary">Write and publish a new article for the public blog page.</p>
      <div className="mt-6">
        <BlogEditor />
      </div>
    </div>
  );
}
