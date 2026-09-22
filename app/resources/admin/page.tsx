"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Plus,
  Trash2,
  Edit,
  Eye,
  Check,
  Upload,
  ArrowRight,
  ArrowUpRight,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  FileText,
  Layers,
  ChevronUp,
  ChevronDown,
  X,
  AlertCircle
} from "lucide-react";

interface PostSection {
  heading: string;
  paragraph: string;
}

interface Post {
  id: string;
  slug: string;
  type: string;
  category: string;
  title: string;
  intro: string;
  author: string;
  coverImage?: string;
  mediaUrls?: string[];
  body: [string, string][];
  publishedAt: string;
  status: "published" | "draft";
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "preview">("list");

  // Form State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("Guide");
  const [category, setCategory] = useState("Business Launch");
  const [author, setAuthor] = useState("Rasheedah Amatullah");
  const [intro, setIntro] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [sections, setSections] = useState<PostSection[]>([
    { heading: "01 / Define the core requirement", paragraph: "Explain the key decision or framework..." },
  ]);

  // Upload state
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Auto load stored passcode from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem("taqwa_admin_passcode");
    if (saved) {
      setPasscode(saved);
      verifyAndFetch(saved);
    }
  }, []);

  async function verifyAndFetch(codeToTest: string) {
    setAuthError("");
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/posts?includeDrafts=true", {
        headers: {
          "x-admin-passcode": codeToTest,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        localStorage.setItem("taqwa_admin_passcode", codeToTest);
        setPosts(data.posts || []);
      } else {
        setIsAuthenticated(false);
        setAuthError("Incorrect admin passcode. Please try again.");
      }
    } catch (err) {
      setAuthError("Failed connecting to server. Please try again.");
    } finally {
      setLoadingPosts(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter the admin passcode.");
      return;
    }
    verifyAndFetch(passcode.trim());
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!editingPostId) {
      // Auto-generate clean slug
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        alert("Cover upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Cover image upload failed.");
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setMediaUrls((prev) => [...prev, data.url]);
        }
      }
    } catch (err) {
      alert("Media upload failed.");
    } finally {
      setUploadingMedia(false);
    }
  }

  function addSection() {
    setSections((prev) => [
      ...prev,
      {
        heading: `0${prev.length + 1} / Section Heading`,
        paragraph: "Add paragraph copy here...",
      },
    ]);
  }

  function updateSection(index: number, key: keyof PostSection, val: string) {
    setSections((prev) => {
      const updated = [...prev];
      updated[index][key] = val;
      return updated;
    });
  }

  function removeSection(index: number) {
    if (sections.length <= 1) {
      alert("A post requires at least one section.");
      return;
    }
    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  function moveSection(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    setSections((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  }

  function resetForm() {
    setEditingPostId(null);
    setTitle("");
    setSlug("");
    setType("Guide");
    setCategory("Business Launch");
    setAuthor("Rasheedah Amatullah");
    setIntro("");
    setCoverImage("");
    setMediaUrls([]);
    setStatus("published");
    setSections([
      { heading: "01 / First key decision", paragraph: "Describe the concept..." },
      { heading: "02 / Execution & details", paragraph: "Describe how to execute..." },
    ]);
    setSaveStatus("idle");
    setErrorMessage("");
  }

  function editPost(post: Post) {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setType(post.type || "Guide");
    setCategory(post.category || "Business Launch");
    setAuthor(post.author || "Rasheedah Amatullah");
    setIntro(post.intro);
    setCoverImage(post.coverImage || "");
    setMediaUrls(post.mediaUrls || []);
    setStatus(post.status || "published");

    // Convert tuple body [[h, p], ...] to sections array
    if (post.body && Array.isArray(post.body)) {
      setSections(
        post.body.map(([heading, paragraph]) => ({
          heading,
          paragraph,
        }))
      );
    } else {
      setSections([{ heading: "01 / Overview", paragraph: post.intro }]);
    }

    setActiveTab("create");
  }

  async function handleDelete(id: string, postTitle: string) {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) return;

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": passcode,
        },
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      alert("Error deleting post.");
    }
  }

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !intro.trim()) {
      setErrorMessage("Title and summary intro are required.");
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saving");
    setErrorMessage("");

    // Convert sections array to tuple array [[heading, paragraph], ...]
    const tupleBody: [string, string][] = sections.map((s) => [s.heading.trim(), s.paragraph.trim()]);

    const postPayload = {
      id: editingPostId || undefined,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type,
      category,
      author,
      intro: intro.trim(),
      coverImage,
      mediaUrls,
      body: tupleBody,
      status,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify(postPayload),
      });

      const data = await res.json();

      if (res.ok && data.post) {
        setSaveStatus("success");
        // Refresh list
        verifyAndFetch(passcode);
        setTimeout(() => {
          setActiveTab("list");
          resetForm();
        }, 1200);
      } else {
        setSaveStatus("error");
        setErrorMessage(data.error || "Failed to save post.");
      }
    } catch (err) {
      setSaveStatus("error");
      setErrorMessage("Network error occurred while saving.");
    }
  }

  // --- UNAUTHENTICATED LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="shariah-badge" style={{ marginBottom: "16px" }}>
            <Lock size={14} />
            <span>TAQWA PUBLISHING STUDIO</span>
          </div>
          <h1 style={{ fontSize: "28px", letterSpacing: "-0.03em", marginBottom: "10px" }}>
            Resource & Blog Admin
          </h1>
          <p style={{ color: "#60636b", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
            Enter your admin passcode to publish articles, field guides, and digital resources to Taqwa Agency.
          </p>

          <form onSubmit={handleLogin}>
            <label className="field">
              Admin Passcode
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                autoFocus
              />
            </label>

            {authError && (
              <div className="admin-error-box">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button type="submit" className="button" style={{ width: "100%", marginTop: "16px" }} disabled={loadingPosts}>
              {loadingPosts ? "Authenticating..." : "Login to Studio"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e4dc", textAlign: "center" }}>
            <Link href="/resources" className="text-link" style={{ fontSize: "13px" }}>
              ← Return to Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="admin-dashboard-layout">
      {/* Top Header Bar */}
      <header className="admin-top-bar">
        <div className="admin-brand-col">
          <Link href="/resources" className="logo">
            <img src="/taqwa-logo.svg" alt="Taqwa Agency" style={{ height: "32px", width: "auto" }} />
          </Link>
          <span className="admin-pill">STUDIO / POST CREATOR</span>
        </div>

        <div className="admin-nav-actions">
          <button
            type="button"
            className={`admin-nav-btn ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            <Layers size={16} /> All Posts ({posts.length})
          </button>
          <button
            type="button"
            className={`admin-nav-btn ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              if (activeTab !== "create") resetForm();
              setActiveTab("create");
            }}
          >
            <Plus size={16} /> {editingPostId ? "Editing Post" : "Create New Post"}
          </button>
          {(activeTab === "create" || activeTab === "preview") && (
            <button
              type="button"
              className={`admin-nav-btn ${activeTab === "preview" ? "active" : ""}`}
              onClick={() => setActiveTab("preview")}
            >
              <Eye size={16} /> Live Preview
            </button>
          )}
          <Link href="/resources" target="_blank" className="admin-site-btn">
            View Live Site <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="admin-main-container">
        {/* LIST TAB */}
        {activeTab === "list" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <div>
                <h2>Published Resources & Articles</h2>
                <p>Manage, edit, or publish new founder field guides, guides, and articles.</p>
              </div>
              <button
                type="button"
                className="button"
                onClick={() => {
                  resetForm();
                  setActiveTab("create");
                }}
              >
                <Plus size={18} /> New Post
              </button>
            </div>

            <div className="admin-posts-grid">
              {posts.map((p) => (
                <article key={p.id} className="admin-post-card">
                  <div className="admin-card-header">
                    <span className="admin-tag-pill">{p.type}</span>
                    <span className={`admin-status-pill ${p.status}`}>{p.status.toUpperCase()}</span>
                  </div>

                  <h3 className="admin-card-title">{p.title}</h3>
                  <p className="admin-card-intro">{p.intro}</p>

                  {p.coverImage && (
                    <div className="admin-cover-preview-sm">
                      <img src={p.coverImage} alt={p.title} />
                    </div>
                  )}

                  <div className="admin-card-footer">
                    <div className="admin-card-meta">
                      <small>{p.category}</small> · <small>{new Date(p.publishedAt).toLocaleDateString()}</small>
                    </div>
                    <div className="admin-card-actions">
                      <Link href={`/resources/${p.slug}`} target="_blank" className="admin-icon-btn" title="View Article">
                        <Eye size={15} />
                      </Link>
                      <button type="button" onClick={() => editPost(p)} className="admin-icon-btn" title="Edit Article">
                        <Edit size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.title)}
                        className="admin-icon-btn danger"
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {posts.length === 0 && (
                <div className="admin-empty-state">
                  <FileText size={32} />
                  <h3>No posts created yet.</h3>
                  <p>Click "Create New Post" above to publish your first resource.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CREATE / EDIT TAB */}
        {activeTab === "create" && (
          <section className="admin-section">
            <form onSubmit={handleSavePost} className="admin-editor-form">
              <div className="admin-editor-header">
                <div>
                  <span className="admin-eyebrow">{editingPostId ? "EDIT POST" : "NEW POST CREATOR"}</span>
                  <h2>{editingPostId ? "Edit Resource Article" : "Create a New Resource Post"}</h2>
                </div>

                <div className="admin-header-buttons">
                  <button
                    type="button"
                    className="button light"
                    onClick={() => setActiveTab("preview")}
                  >
                    <Eye size={16} /> Live Preview
                  </button>
                  <button type="submit" className="button" disabled={saveStatus === "saving"}>
                    {saveStatus === "saving" ? "Saving Post..." : editingPostId ? "Update Article" : "Publish Resource"}
                    <Check size={18} />
                  </button>
                </div>
              </div>

              {saveStatus === "success" && (
                <div className="admin-success-box">
                  <Check size={18} />
                  <span>Post saved successfully! Redirecting to post list...</span>
                </div>
              )}

              {saveStatus === "error" && (
                <div className="admin-error-box">
                  <AlertCircle size={18} />
                  <span>{errorMessage || "Failed saving post."}</span>
                </div>
              )}

              {/* Form Grid */}
              <div className="admin-form-grid">
                {/* Left Column: Metadata */}
                <div className="admin-col">
                  <label className="field">
                    Article Title
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Before you launch, ask better questions."
                    />
                  </label>

                  <div className="admin-form-row-2">
                    <label className="field">
                      URL Slug
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. before-you-launch"
                      />
                    </label>

                    <label className="field">
                      Author Name
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Rasheedah Amatullah"
                      />
                    </label>
                  </div>

                  <div className="admin-form-row-3">
                    <label className="field">
                      Type
                      <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
                        <option value="Guide">Guide</option>
                        <option value="Field notes">Field notes</option>
                        <option value="Essay">Essay</option>
                        <option value="Case Study">Case Study</option>
                        <option value="Announcement">Announcement</option>
                      </select>
                    </label>

                    <label className="field">
                      Category
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                        <option value="Business Launch">Business Launch</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Automation">Automation</option>
                        <option value="Digital Strategy">Digital Strategy</option>
                        <option value="General">General</option>
                      </select>
                    </label>

                    <label className="field">
                      Publish Status
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                        className="form-select"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </label>
                  </div>

                  <label className="field">
                    Intro / Summary Paragraph
                    <textarea
                      required
                      rows={3}
                      value={intro}
                      onChange={(e) => setIntro(e.target.value)}
                      placeholder="A short 1-2 sentence lead summary displayed in resource cards and post hero..."
                    />
                  </label>

                  {/* Featured Cover Media Upload */}
                  <div className="admin-media-upload-block">
                    <div className="admin-upload-label">
                      <ImageIcon size={16} />
                      <span>Featured Cover Image / Graphic</span>
                    </div>

                    <div className="admin-upload-box">
                      {coverImage ? (
                        <div className="admin-cover-preview-wrapper">
                          <img src={coverImage} alt="Cover Preview" />
                          <button
                            type="button"
                            className="admin-remove-img-btn"
                            onClick={() => setCoverImage("")}
                            title="Remove cover"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="admin-dropzone">
                          <Upload size={24} />
                          <span>{uploadingCover ? "Uploading image..." : "Upload Cover Image / Illustration"}</span>
                          <small>Drag & drop or click to select image</small>
                          <input type="file" accept="image/*" onChange={handleCoverUpload} hidden />
                        </label>
                      )}

                      <div className="admin-url-fallback">
                        <span>or paste image URL directly:</span>
                        <input
                          type="url"
                          value={coverImage}
                          onChange={(e) => setCoverImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Structured Body Sections */}
                <div className="admin-col">
                  <div className="admin-sections-header">
                    <div>
                      <h3>Article Sections</h3>
                      <p>Add structured headings and paragraphs matching Taqwa field guides.</p>
                    </div>
                    <button type="button" onClick={addSection} className="button light small">
                      <Plus size={15} /> Add Section
                    </button>
                  </div>

                  <div className="admin-sections-list">
                    {sections.map((sec, i) => (
                      <div key={i} className="admin-section-card">
                        <div className="admin-section-card-top">
                          <span className="admin-section-num">SECTION 0{i + 1}</span>
                          <div className="admin-section-controls">
                            <button
                              type="button"
                              onClick={() => moveSection(i, "up")}
                              disabled={i === 0}
                              className="admin-icon-btn"
                              title="Move up"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveSection(i, "down")}
                              disabled={i === sections.length - 1}
                              className="admin-icon-btn"
                              title="Move down"
                            >
                              <ChevronDown size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSection(i)}
                              className="admin-icon-btn danger"
                              title="Remove section"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <label className="field" style={{ marginBottom: "12px" }}>
                          Heading
                          <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) => updateSection(i, "heading", e.target.value)}
                            placeholder="e.g. 01 / Start with a person, not a product."
                          />
                        </label>

                        <label className="field" style={{ marginBottom: 0 }}>
                          Body Paragraph
                          <textarea
                            rows={4}
                            value={sec.paragraph}
                            onChange={(e) => updateSection(i, "paragraph", e.target.value)}
                            placeholder="Explain this point clearly and concisely..."
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Additional Media Uploads */}
                  <div className="admin-media-upload-block" style={{ marginTop: "24px" }}>
                    <div className="admin-upload-label">
                      <Upload size={16} />
                      <span>Additional Media Attachments</span>
                    </div>

                    <label className="admin-dropzone-sm">
                      <Upload size={18} />
                      <span>{uploadingMedia ? "Uploading media..." : "+ Attach Photos or Media Files"}</span>
                      <input type="file" accept="image/*,application/pdf" multiple onChange={handleMediaUpload} hidden />
                    </label>

                    {mediaUrls.length > 0 && (
                      <div className="admin-media-tags-list">
                        {mediaUrls.map((url, idx) => (
                          <div key={idx} className="admin-media-chip">
                            <ImageIcon size={13} />
                            <a href={url} target="_blank" rel="noreferrer">
                              Media #{idx + 1}
                            </a>
                            <button
                              type="button"
                              onClick={() => setMediaUrls((prev) => prev.filter((_, i) => i !== idx))}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-form-submit-bar">
                <button
                  type="button"
                  className="button light"
                  onClick={() => setActiveTab("preview")}
                >
                  <Eye size={16} /> Preview How It Looks
                </button>
                <button type="submit" className="button" disabled={saveStatus === "saving"}>
                  {saveStatus === "saving" ? "Saving..." : editingPostId ? "Update Article" : "Publish Article Now"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </section>
        )}

        {/* PREVIEW TAB */}
        {activeTab === "preview" && (
          <section className="admin-section">
            <div className="admin-preview-banner">
              <span>LIVE PREVIEW MODE</span>
              <button type="button" className="button small" onClick={() => setActiveTab("create")}>
                ← Back to Editor
              </button>
            </div>

            <article className="article" style={{ background: "#fff", padding: "48px 6%", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div className="eyebrow" style={{ color: "#819808", fontWeight: 700 }}>
                {type.toUpperCase()} / {category.toUpperCase()}
              </div>
              <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", lineHeight: 1.1, margin: "16px 0 20px" }}>{title || "Untitled Article"}</h1>
              <p className="article-intro" style={{ fontSize: "18px", color: "#555860", lineHeight: 1.6, maxWidth: "800px" }}>
                {intro || "Your article intro summary will appear here."}
              </p>

              <div style={{ margin: "24px 0 36px", fontSize: "13px", color: "#888", display: "flex", gap: "16px" }}>
                <span>By <strong>{author}</strong></span>
                <span>·</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              {coverImage && (
                <div style={{ marginBottom: "40px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e2d9" }}>
                  <img src={coverImage} alt={title} style={{ width: "100%", maxHeight: "480px", objectFit: "cover" }} />
                </div>
              )}

              {sections.map((sec, i) => (
                <section key={i} style={{ marginBottom: "36px" }}>
                  <span className="mono" style={{ color: "#819808", fontWeight: 600, fontSize: "13px" }}>0{i + 1}</span>
                  <h2 style={{ fontSize: "24px", marginTop: "6px", marginBottom: "12px" }}>{sec.heading}</h2>
                  <p style={{ fontSize: "16.5px", color: "#2d3036", lineHeight: 1.7, maxWidth: "780px" }}>{sec.paragraph}</p>
                </section>
              ))}

              {mediaUrls.length > 0 && (
                <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #e2e4dc" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Attached Media & Resources</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                    {mediaUrls.map((url, idx) => (
                      <a key={idx} href={url} target="_blank" rel="noreferrer" style={{ display: "block", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd" }}>
                        <img src={url} alt={`Attachment ${idx + 1}`} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </section>
        )}
      </main>
    </div>
  );
}
