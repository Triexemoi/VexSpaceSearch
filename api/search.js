import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      tools: [{ type: "web_search_preview" }],
      input: `Tìm kiếm và liệt kê kết quả web về: ${q}.
              Trả về dạng:
              Title:
              Link:
              Description:
              ---`
    });

    res.status(200).json({
      result: response.output_text
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
