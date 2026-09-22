import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Clean filename
    const origName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `media_${Date.now()}_${origName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("[upload] Failed to process media upload:", error);
    return NextResponse.json({ error: "Failed to process file upload" }, { status: 500 });
  }
}
