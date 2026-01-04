import pool from "@/lib/db";

// GET tasks
export async function GET() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  return Response.json(result.rows);
}

// POST task
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title) {
    return new Response("Title required", { status: 400 });
  }

  await pool.query(
    "INSERT INTO tasks (title) VALUES ($1)",
    [body.title]
  );

  return Response.json({ success: true });
}

// DELETE task
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [id]
  );

  return Response.json({ success: true });
}
