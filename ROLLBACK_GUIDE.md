# Rollback Guide - Switch to Static Data

If something goes wrong with the API or you need to rollback to static data, follow these steps:

## Quick Rollback (Environment Variable)

### Option 1: Set Environment Variable

Add to your `.env.local` or Railway environment variables:

```env
NEXT_PUBLIC_USE_STATIC_DATA=true
```

This will immediately switch the frontend to use static data from `data/news.ts` instead of the API.

### Option 2: Remove Environment Variable

If the variable is not set or set to `false`, the app will:
1. Try to fetch from API
2. Automatically fallback to static data if API fails
3. Show static data if API is unavailable

## How It Works

The frontend now has **automatic fallback** built-in:

1. **If `NEXT_PUBLIC_USE_STATIC_DATA=true`**: Always uses static data (no API calls)
2. **If API fails**: Automatically falls back to static data
3. **If API succeeds**: Uses API data

## Files Changed

- `lib/api.ts` - API client with fallback logic
- `app/news/page.tsx` - News listing page (uses API with fallback)
- `app/news/[slug]/page.tsx` - Article detail page (uses API with fallback)

## Static Data Location

Static data is always available in: `data/news.ts`

This file contains:
- `newsArticles` - All articles
- `featuredArticles` - Featured articles
- `latestArticles` - Latest articles

## Testing Rollback

1. Set `NEXT_PUBLIC_USE_STATIC_DATA=true` in `.env.local`
2. Restart your Next.js dev server
3. Visit `/news` - should show static articles
4. Visit `/news/[any-slug]` - should show static article if it exists

## Re-enable API

To switch back to API:

1. Set `NEXT_PUBLIC_USE_STATIC_DATA=false` or remove it
2. Restart your Next.js dev server
3. The app will now try to fetch from API first

## Railway Deployment

In Railway, you can set environment variables in:
1. Go to your frontend service
2. Click "Variables" tab
3. Add `NEXT_PUBLIC_USE_STATIC_DATA=true` to force static data
4. Redeploy
