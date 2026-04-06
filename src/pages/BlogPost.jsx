import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../lib/blog.js";
import { Footer } from "../components/Footer.jsx";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <main className="page">
          <div className="page-eye">// blog</div>
          <h1 className="page-title">記事が見つかりません</h1>
          <Link to="/blog" className="btn btn-outline blog-back">
            ブログ一覧へ戻る
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="page">
        <article>
          <header className="blog-post-header">
            <div className="blog-post-date">{post.date || "No date"}</div>
            <h1 className="blog-post-title">{post.title}</h1>
          </header>

          <section
            className="markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <Link to="/blog" className="btn btn-outline blog-back">
            ブログ一覧へ戻る
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
