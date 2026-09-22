import fs from "fs";
import path from "path";

export interface PostSection {
  heading: string;
  paragraph: string;
}

export interface Post {
  id: string;
  slug: string;
  type: string; // e.g. "Guide", "Field notes", "Essay", "Case Study"
  category: string; // e.g. "Business Launch", "Project Management", "Automation", "General"
  title: string;
  intro: string;
  author: string;
  coverImage?: string;
  mediaUrls?: string[];
  body: [string, string][]; // tuple array [heading, paragraph] for compatibility with site.tsx
  publishedAt: string;
  status: "published" | "draft";
}

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");

export const DEFAULT_POSTS: Post[] = [
  {
    id: "post-seed-1",
    slug: "before-you-build",
    type: "Guide",
    category: "Business Launch",
    title: "Before you build, ask better questions.",
    intro: "A practical starting point for turning an idea into a project.",
    author: "Rasheedah Amatullah",
    publishedAt: "2026-01-15T09:00:00.000Z",
    status: "published",
    body: [
      [
        "Start with a person, not a product.",
        "Who is this for? Write down one specific customer, the problem they face, and how they solve it today. Talk to potential customers before committing to a solution. Look for repeated needs, not just encouraging feedback."
      ],
      [
        "Define the first useful version.",
        "What is the smallest version of the business that delivers real value? Separate what must exist at launch from what can wait. A clear first offer is easier to test, cost, and coordinate."
      ],
      [
        "Make the unknowns visible.",
        "List the assumptions behind your idea: demand, supplier reliability, costs, delivery, payments, and your own available time. Decide which uncertainty would be most expensive to discover late. Investigate that one first."
      ],
      [
        "Connect the work.",
        "Map the people and decisions your launch depends on. Packaging needs product specifications. A website needs an offer and payment process. An operating business needs more than a launch date."
      ],
      [
        "Your next step",
        "Write a one-page brief: the customer, the problem, the offer, your constraints, and the three questions you need answered next. Use it to start a focused conversation."
      ]
    ]
  },
  {
    id: "post-seed-2",
    slug: "less-chasing-more-progress",
    type: "Field notes",
    category: "Project Management",
    title: "Less chasing. More progress.",
    intro: "Five decisions that make a complicated project easier to move.",
    author: "Rasheedah Amatullah",
    publishedAt: "2026-02-01T10:30:00.000Z",
    status: "published",
    body: [
      [
        "Give the project one source of truth.",
        "Keep the scope, owners, dates, and latest decisions in a shared place. People should not have to search multiple message threads to understand what happens next."
      ],
      [
        "Name an owner for every outcome.",
        "A task assigned to everyone is easy for everyone to miss. Give each deliverable one accountable owner, even when several people contribute."
      ],
      [
        "Track dependencies, not just deadlines.",
        "Ask what must happen before each task can begin. Surface the approvals, assets, specifications, and access a team needs. Waiting is work you can often prevent."
      ],
      [
        "Create a decision rhythm.",
        "Agree when decisions are reviewed, who can approve them, and how scope changes are recorded. Short, consistent check-ins usually beat long, reactive meetings."
      ],
      [
        "Finish with acceptance criteria.",
        "Define what complete means before the work starts. A shared standard makes review more useful and avoids endless revisions."
      ]
    ]
  },
  {
    id: "post-seed-3",
    slug: "before-you-automate",
    type: "Guide",
    category: "Automation",
    title: "Before you automate anything.",
    intro: "A business-first way to decide where technology belongs.",
    author: "Rasheedah Amatullah",
    publishedAt: "2026-02-18T14:15:00.000Z",
    status: "published",
    body: [
      [
        "Understand the existing work.",
        "Follow a real request from beginning to end. Note where information enters, who touches it, and where delays or errors appear. Describe the operation before selecting a tool."
      ],
      [
        "Improve the process first.",
        "Remove unnecessary steps and clarify ownership. Automating a confusing process can make confusion travel faster. Start with one stable, repeated workflow."
      ],
      [
        "Choose a useful outcome.",
        "Decide what better means: fewer manual entries, faster responses, clearer records, or less time spent checking status. Measure the current process so you can compare later."
      ],
      [
        "Keep people in the right places.",
        "Automated workflows need appropriate review. Identify sensitive information, access permissions, exceptions, and decisions that require human judgment. Plan a fallback before you launch."
      ],
      [
        "Pilot, learn, then expand.",
        "Test with a limited scope and realistic examples. Train the people who will use the system, document its limits, and only expand when the results justify it."
      ]
    ]
  }
];

function ensureDataFileExists(): Post[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(POSTS_FILE)) {
      fs.writeFileSync(POSTS_FILE, JSON.stringify(DEFAULT_POSTS, null, 2), "utf-8");
      return DEFAULT_POSTS;
    }

    const fileContent = fs.readFileSync(POSTS_FILE, "utf-8");
    const posts = JSON.parse(fileContent) as Post[];
    if (!Array.isArray(posts) || posts.length === 0) {
      fs.writeFileSync(POSTS_FILE, JSON.stringify(DEFAULT_POSTS, null, 2), "utf-8");
      return DEFAULT_POSTS;
    }
    return posts;
  } catch (err) {
    console.error("[posts-store] Error reading posts file, falling back to defaults:", err);
    return DEFAULT_POSTS;
  }
}

export function getAllPosts(includeDrafts = false): Post[] {
  const posts = ensureDataFileExists();
  const filtered = includeDrafts ? posts : posts.filter((p) => p.status === "published");
  return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const posts = ensureDataFileExists();
  return posts.find((p) => p.slug === slug) || null;
}

export function savePost(post: Partial<Post> & { title: string; intro: string }): Post {
  const posts = ensureDataFileExists();
  const now = new Date().toISOString();

  // Generate clean slug from title if not provided
  let slug = post.slug
    ? post.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  if (!slug) {
    slug = `post-${Date.now()}`;
  }

  const existingIndex = posts.findIndex((p) => (post.id && p.id === post.id) || p.slug === slug);

  const fullPost: Post = {
    id: post.id || (existingIndex >= 0 ? posts[existingIndex].id : `post-${Date.now()}`),
    slug,
    type: post.type || "Guide",
    category: post.category || "Business Launch",
    title: post.title.trim(),
    intro: post.intro.trim(),
    author: post.author || "Rasheedah Amatullah",
    coverImage: post.coverImage || "",
    mediaUrls: post.mediaUrls || [],
    body: post.body || [],
    publishedAt: post.publishedAt || (existingIndex >= 0 ? posts[existingIndex].publishedAt : now),
    status: post.status || "published",
  };

  if (existingIndex >= 0) {
    posts[existingIndex] = fullPost;
  } else {
    posts.unshift(fullPost);
  }

  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("[posts-store] Failed to save post:", err);
  }

  return fullPost;
}

export function deletePost(idOrSlug: string): boolean {
  let posts = ensureDataFileExists();
  const initialLen = posts.length;
  posts = posts.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);

  if (posts.length !== initialLen) {
    try {
      fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
      return true;
    } catch (err) {
      console.error("[posts-store] Failed writing posts after deletion:", err);
    }
  }
  return false;
}
