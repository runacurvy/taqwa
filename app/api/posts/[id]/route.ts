import { NextRequest, NextResponse } from "next/server";
import { deletePost, savePost, getPostBySlug } from "@/lib/posts-store";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "taqwa2026";

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    return NextResponse.json({ error: "Post ID or slug required" }, { status: 400 });
  }

  const success = deletePost(id);
  if (success) {
    return NextResponse.json({ ok: true, message: "Post deleted" });
  } else {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const body = await req.json();
    const saved = savePost({
      ...body,
      id,
    });
    return NextResponse.json({ ok: true, post: saved });
  } catch (err) {
    console.error("[posts-api] Failed updating post:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
