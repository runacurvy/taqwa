import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost } from "@/lib/posts-store";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "Taqwa_Studio_2026_SecureAdmin!#99";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const passcodeHeader = req.headers.get("x-admin-passcode");
  if (passcodeHeader === ADMIN_PASSCODE) return true;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === ADMIN_PASSCODE) return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeDrafts = searchParams.get("includeDrafts") === "true";
  const authorized = isAuthorized(req);

  // Only allow viewing drafts if authorized
  const posts = getAllPosts(includeDrafts && authorized);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized. Please enter valid admin credentials." }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.intro) {
      return NextResponse.json({ error: "Title and intro are required." }, { status: 400 });
    }

    const saved = savePost({
      id: body.id,
      slug: body.slug,
      type: body.type,
      category: body.category,
      title: body.title,
      intro: body.intro,
      author: body.author,
      coverImage: body.coverImage,
      mediaUrls: body.mediaUrls,
      body: body.body,
      status: body.status,
      publishedAt: body.publishedAt,
    });

    return NextResponse.json({ ok: true, post: saved });
  } catch (err) {
    console.error("[posts-api] Failed saving post:", err);
    return NextResponse.json({ error: "Failed to save post." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const success = deletePost(id);
  if (success) {
    return NextResponse.json({ ok: true, message: "Post deleted successfully" });
  } else {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
