# Frontend API Integration Setup

## Overview

The frontend now fetches articles from your backend API with automatic fallback to static data.

## Configuration

### 1. Create `.env.local` file

Create a `.env.local` file in the `Appify` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000

# Or for production (Railway backend):
# NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Set to "true" to force static data (for rollback)
NEXT_PUBLIC_USE_STATIC_DATA=false
```

### 2. For Railway Deployment

Set these environment variables in Railway:
- `NEXT_PUBLIC_API_URL` - Your backend Railway URL
- `NEXT_PUBLIC_USE_STATIC_DATA` - Set to `false` (or leave unset) to use API

## How It Works

### Automatic Fallback System

1. **If `NEXT_PUBLIC_USE_STATIC_DATA=true`**: Always uses static data (no API calls)
2. **If API is available**: Fetches from API and displays articles
3. **If API fails**: Automatically falls back to static data
4. **If API URL not set**: Uses static data

### Data Flow

```
Frontend Request
  ↓
Check NEXT_PUBLIC_USE_STATIC_DATA
  ↓
If false → Try API → Success? → Display API data
                    ↓
                  Fail? → Fallback to static data
  ↓
If true → Use static data directly
```

## API Endpoints Used

- `GET /api/news?status=published` - Fetch all published articles
- `GET /api/news/:slug` - Fetch single article by slug

## Data Mapping

The API returns `topics` but the frontend expects `category`. This is automatically mapped:
- API: `{ topics: "AI" }`
- Frontend: `{ category: "AI", topics: "AI" }`

## Testing

1. **Start backend**: Make sure your backend is running on port 4000 (or your configured port)
2. **Start frontend**: `npm run dev`
3. **Visit**: `http://localhost:3000/news`
4. **Check browser console**: Look for API fetch logs or fallback messages

## Rollback

To rollback to static data immediately:
1. Set `NEXT_PUBLIC_USE_STATIC_DATA=true` in `.env.local`
2. Restart Next.js dev server
3. Frontend will now use static data only

## Troubleshooting

- **No articles showing**: Check if API is running and accessible
- **CORS errors**: Make sure backend CORS is configured for your frontend URL
- **Wrong data format**: Check browser console for API response format
- **Static data always showing**: Check `NEXT_PUBLIC_USE_STATIC_DATA` is not set to `true`
