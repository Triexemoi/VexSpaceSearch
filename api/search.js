import fetch from "node-fetch";

export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const apiKey = process.env.RAPIDAPI_KEY;

    const response = await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=${encodeURIComponent(q)}&pageNumber=1&pageSize=10&autoCorrect=true`, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
