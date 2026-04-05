import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// GET /api/departments — list user's departments (with agent count)
export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: departments, error } = await supabase
    .from("departments")
    .select("*, agents(count)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Flatten the count from { agents: [{ count: N }] } → agent_count: N
  const result = (departments ?? []).map((dept) => ({
    ...dept,
    agent_count: dept.agents?.[0]?.count ?? 0,
    agents: undefined,
  }));

  return NextResponse.json(result);
}

// POST /api/departments — create new department
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, icon, color, description } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required and must be a non-empty string" }, { status: 400 });
  }

  if (icon !== undefined && typeof icon !== "string") {
    return NextResponse.json({ error: "Icon must be a string" }, { status: 400 });
  }

  if (color !== undefined && typeof color !== "string") {
    return NextResponse.json({ error: "Color must be a string" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("departments")
    .insert({
      user_id: user.id,
      name,
      icon: icon ?? "🏢",
      color: color ?? "#D8FB32",
      description: description ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
