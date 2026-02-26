# Railway Deployment Guide

## Required Environment Variables

Set these in your Railway **appify-frontend** service → Variables:

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_API_URL` | `https://appify-backend-production-5a98.up.railway.app` | **Yes** – backend for news data |
| `NEXT_PUBLIC_FOUNDER_VIDEO_URL` | CDN URL for founder video (see below) | No – fallback CDN used if unset |
| `NEXT_PUBLIC_VIDEO_CDN_BASE` | Base URL for category videos (Strategy, Creative, etc.) | No – uses local `/Videos/` if unset |

## Backend Data

The frontend fetches news articles from the Postgres-backed API. Ensure:

1. **`NEXT_PUBLIC_API_URL`** is set to your backend URL (e.g. `https://appify-backend-production-5a98.up.railway.app`).
2. The backend Postgres has the migrated articles (1038+ from the old DB).

## Founder Video & Category Videos

Videos are in Git LFS (`public/Videos/`). Railway builds often don’t pull LFS files, so videos can 404 in production.

**Options:**

1. **Use the fallback CDN** – If `NEXT_PUBLIC_FOUNDER_VIDEO_URL` is not set, the app uses `https://cdn.ebadfd.tech/Appify_Introduction_CEO_cropped.mp4` on Railway.
2. **Host your own** – Upload `Mennan Voice Cut.mp4` to a CDN (e.g. Cloudflare R2, S3, etc.) and set:
   ```env
   NEXT_PUBLIC_FOUNDER_VIDEO_URL=https://your-cdn.com/Mennan%20Voice%20Cut.mp4
   ```
3. **Category videos** – For Strategy, Creative, Development, Intelligence:
   ```env
   NEXT_PUBLIC_VIDEO_CDN_BASE=https://your-cdn.com/videos
   ```
   Files expected: `Strategy.mp4`, `Creative.mp4`, `Development.mp4`, `Intelligence.mp4`.

## Quick Checklist

- [ ] `NEXT_PUBLIC_API_URL` set in Railway frontend Variables
- [ ] Redeploy after changing env vars (NEXT_PUBLIC_* are baked in at build time)
- [ ] Founder video loads (fallback CDN or custom URL)
- [ ] Newsroom shows articles from backend
