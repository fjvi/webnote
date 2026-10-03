// 处理 GET /api/notes 请求（读取笔记）
export async function onRequestGet(context) {
  const { env } = context;
  const { results } = await env.DB.prepare("SELECT * FROM notes ORDER BY updated_at DESC").all();
  return Response.json(results);
}

// 处理 POST /api/notes 请求（保存/更新笔记）
export async function onRequestPost(context) {
  const { request, env } = context;
  const { id, content } = await request.json();
  
  await env.DB.prepare(
    "INSERT INTO notes (id, content, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(id) DO UPDATE SET content=excluded.content, updated_at=datetime('now')"
  ).bind(id, content).run();

  return Response.json({ success: true });
}
