# Generate Article - Quick Reference

## Manual Article Generation

To manually trigger article generation on Railway:

```bash
# Set API key (use the value from Railway Variables)
$env:API_KEY = "your-secret-api-key-for-write-endpoints"

# Run the script
npm run generate-article
```

Or directly:
```bash
npx tsx scripts/generate-article.ts
```

## Endpoint Details

- **URL**: `https://appifyglobalbackend-production.up.railway.app/api/admin/generate`
- **Method**: `POST`
- **Header**: `x-api-key` (lowercase) with your API_KEY value
- **Body**: `{}` (empty JSON object)

## Automatic Generation

The cron job runs automatically every hour when `ENABLE_CRON=true` is set in Railway variables.

## Files

- Script: `scripts/generate-article.ts`
- API Function: `lib/api.ts` → `generateArticle()`
