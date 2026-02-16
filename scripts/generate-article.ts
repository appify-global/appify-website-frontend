/**
 * Script to generate an article via the Railway backend API
 * 
 * Usage: 
 *   tsx scripts/generate-article.ts
 *   or
 *   npm run generate-article (if added to package.json)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://appifyglobalbackend-production.up.railway.app";
const API_KEY = process.env.API_KEY || "your-secret-api-key-for-write-endpoints";

async function generateArticle() {
  try {
    console.log(`Triggering article generation on ${API_BASE_URL}/api/admin/generate...`);
    
    // Use fetchAll=true query param to fetch all RSS items (including older ones)
    const fetchAll = process.argv.includes("--fetch-all") || process.argv.includes("--all");
    const url = `${API_BASE_URL}/api/admin/generate${fetchAll ? "?fetchAll=true" : ""}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY, // Note: lowercase header name as used in backend
      },
      body: JSON.stringify({ fetchAll }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("❌ Unauthorized (401). Check your API_KEY is correct.");
        return;
      }
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Article generation triggered successfully!");
    console.log(JSON.stringify(data, null, 2));
    console.log("\n⏳ This may take a few minutes. Check Railway logs for progress.");
  } catch (error: any) {
    console.error("❌ Failed to generate article:", error.message);
    if (error.message.includes("fetch")) {
      console.error("   Make sure the Railway backend is accessible and running.");
    }
  }
}

generateArticle();
