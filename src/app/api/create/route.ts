// This functionality has been moved to /api/games/route.ts
// This file is no longer needed, but we're keeping it to avoid file deletion
// If creating a new project, you would not need this file

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Redirect to the main API route
  return NextResponse.redirect(new URL('/api/games', request.url));
}