/**
 * Script to delete recently created articles
 * 
 * Usage: 
 *   npx tsx scripts/delete-recent-articles.ts
 *   npx tsx scripts/delete-recent-articles.ts --count 10
 *   npx tsx scripts/delete-recent-articles.ts --hours 1
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://appifyglobalbackend-production.up.railway.app";
const API_KEY = process.env.API_KEY || "your-secret-api-key-for-write-endpoints";

async function deleteRecentArticles() {
  try {
    const count = process.argv.includes("--count") 
      ? parseInt(process.argv[process.argv.indexOf("--count") + 1]) || 10
      : 10;
    
    const hours = process.argv.includes("--hours")
      ? parseInt(process.argv[process.argv.indexOf("--hours") + 1])
      : undefined;
    
    const url = hours 
      ? `${API_BASE_URL}/api/admin/delete-recent?hours=${hours}`
      : `${API_BASE_URL}/api/admin/delete-recent?count=${count}`;
    
    console.log(`Deleting recent articles${hours ? ` (last ${hours} hours)` : ` (last ${count} articles)`}...`);
    
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
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
    console.log("✅ Success:", data.message);
  } catch (error: any) {
    console.error("❌ Failed to delete articles:", error.message);
  }
}

deleteRecentArticles();
