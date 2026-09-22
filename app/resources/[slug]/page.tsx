import { getPostBySlug } from "@/lib/posts-store";
import { Shell, FinalCTA } from "../../site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Resource Article · Taqwa Agency" };
  return {
    title: `${post.title} · Taqwa Agency`,
    description: post.intro,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <Shell>
      <article className="article" style={{ maxWidth: "920px", margin: "0 auto", padding: "120px 4.5% 80px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link className="text-link" href="/resources" style={{ fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            ← All resources
          </Link>
        </div>

        <div className="eyebrow" style={{ color: "#819808", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em" }}>
          {(post.type || "GUIDE").toUpperCase()} / {(post.category || "GENERAL").toUpperCase()}
        </div>

        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", lineHeight: 1.1, margin: "16px 0 20px", fontWeight: 600 }}>
          {post.title}
        </h1>

        <p className="article-intro" style={{ fontSize: "19px", color: "#555860", lineHeight: 1.6, maxWidth: "800px", fontWeight: 400 }}>
          {post.intro}
        </p>

        <div style={{ margin: "24px 0 40px", fontSize: "13px", color: "#777a82", display: "flex", gap: "16px", alignItems: "center" }}>
          <span>By <strong style={{ color: "var(--ink)" }}>{post.author || "Rasheedah Amatullah"}</strong></span>
          <span>·</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>

        {post.coverImage && (
          <div style={{ marginBottom: "48px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e4dc" }}>
            <img src={post.coverImage} alt={post.title} style={{ width: "100%", maxHeight: "520px", objectFit: "cover", display: "block" }} />
          </div>
        )}

        {/* Sections */}
        <div style={{ marginTop: "32px" }}>
          {post.body &&
            post.body.map(([heading, paragraph], i) => (
              <section key={i} style={{ marginBottom: "44px" }}>
                <span className="mono" style={{ color: "#819808", fontWeight: 600, fontSize: "13px", display: "block", marginBottom: "6px" }}>
                  0{i + 1}
                </span>
                <h2 style={{ fontSize: "24px", letterSpacing: "-0.02em", marginBottom: "14px", color: "var(--ink)" }}>
                  {heading}
                </h2>
                <p style={{ fontSize: "17px", color: "#32353b", lineHeight: 1.7, maxWidth: "780px" }}>
                  {paragraph}
                </p>
              </section>
            ))}
        </div>

        {/* Media Attachments */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>Attached Visuals & Media</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {post.mediaUrls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", borderRadius: "10px", overflow: "hidden", border: "1px solid #e0e2d9" }}
                >
                  <img src={url} alt={`Media ${idx + 1}`} style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action / Next Step CTA */}
        <div style={{ marginTop: "60px", paddingTop: "32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h3 style={{ fontSize: "22px", marginBottom: "6px" }}>Ready to move your project forward?</h3>
            <p style={{ color: "#60636b", fontSize: "15px", margin: 0 }}>Discuss your vision, requirements, and next steps with Taqwa Agency.</p>
          </div>
          <Link className="button" href="/contact">
            Talk Through Your Next Step <ArrowUpRight size={18} />
          </Link>
        </div>
      </article>

      <FinalCTA />
    </Shell>
  );
}
