import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// GET /api/agents — list user's agents (filterable by department_id)
export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get("department_id");

  let query = supabase
    .from("agents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (departmentId) {
    query = query.eq("department_id", departmentId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/agents — create new agent
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { department_id, name, role, icon, description, capabilities } = body;

  if (!department_id || typeof department_id !== "string" || department_id.trim().length === 0) {
    return NextResponse.json({ error: "department_id is required and must be a non-empty string" }, { status: 400 });
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "name is required and must be a non-empty string" }, { status: 400 });
  }

  if (!role || typeof role !== "string" || role.trim().length === 0) {
    return NextResponse.json({ error: "role is required and must be a non-empty string" }, { status: 400 });
  }

  if (capabilities !== undefined && !Array.isArray(capabilities)) {
    return NextResponse.json({ error: "capabilities must be an array" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agents")
    .insert({
      user_id: user.id,
      department_id,
      name,
      role,
      icon: icon ?? "🤖",
      description: description ?? null,
      capabilities: capabilities ?? [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
