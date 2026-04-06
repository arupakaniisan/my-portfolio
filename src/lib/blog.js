import { marked } from "marked";
import DOMPurify from "dompurify";

const markdownModules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const ENABLE_MARKDOWN_SANITIZE =
  import.meta.env.VITE_SANITIZE_MARKDOWN !== "false";

function parseFrontMatter(raw) {
  if (!raw.startsWith("---")) {
    return { meta: {}, body: raw };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: {}, body: raw };
  }

  const metaBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trimStart();
  const meta = {};

  for (const line of metaBlock.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    meta[key.trim()] = rest.join(":").trim();
  }

  return { meta, body };
}

function createExcerpt(markdownText) {
  const plain = markdownText
    .replace(/^#+\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();

  return plain.slice(0, 130) + (plain.length > 130 ? "..." : "");
}

function dateValue(date) {
  const ms = Date.parse(date || "");
  return Number.isNaN(ms) ? 0 : ms;
}

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function renderMarkdownHtml(markdownText) {
  const rendered = marked.parse(markdownText);
  if (!ENABLE_MARKDOWN_SANITIZE) {
    return rendered;
  }

  return DOMPurify.sanitize(rendered, {
    USE_PROFILES: { html: true },
  });
}

const posts = Object.entries(markdownModules)
  .map(([path, raw]) => {
    const slug = slugFromPath(path);
    const { meta, body } = parseFrontMatter(raw);
    const firstHeading = body.match(/^#\s+(.+)$/m)?.[1]?.trim();

    const title = meta.title || firstHeading || slug;
    const excerpt = meta.excerpt || createExcerpt(body);
    const published = meta.published !== "false";

    return {
      slug,
      title,
      date: meta.date || "",
      excerpt,
      html: renderMarkdownHtml(body),
      published,
    };
  })
  .filter((post) => post.published)
  .sort((a, b) => dateValue(b.date) - dateValue(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
