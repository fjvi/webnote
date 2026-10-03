// 文件路径：functions/api/notes/[id].js
// 当访问 /api/notes/001 时，context.params.id 会自动拿到 "001"

export async function onRequestGet(context) {
  const noteId = context.params.id; // 拿到 URL 里的 ID "001"
  const { env } = context;

  const result = await env.DB.prepare(
    "SELECT content FROM notes WHERE id = ?"
  ).bind(noteId).first();

  if (!result) {
    // 如果数据库里没有找到该 ID，返回默认/空模板
    return Response.json({ content: "这是默认模板内容..." });
  }

  // 查到了数据，返回数据库中的真实内容
  return Response.json(result);
}
