import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/blog.js";
import { Footer } from "../components/Footer.jsx";

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <>
      <main className="page">
        <div className="page-eye">// blog</div>
        <h1 className="page-title">Blog</h1>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <p>まだ記事がありません。</p>
            <p>
              <strong>src/content/blog/</strong> に <strong>.md</strong> ファイルを追加すると、ここに表示されます。
            </p>
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-meta">{post.date || "No date"}</div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
