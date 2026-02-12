# Railway Environment Variables Checklist

## ✅ You're on `main` branch - Good!

## 🔧 Frontend Service (Website.Staging.Nimeshan)

**Go to Railway → Website.Staging.Nimeshan → Variables**

**MUST HAVE these variables:**
```
NEXT_PUBLIC_API_URL=https://appifyglobalbackend-production.up.railway.app
NEXT_PUBLIC_USE_STATIC_DATA=false
```

**If these are missing:**
1. Click "New Variable"
2. Add `NEXT_PUBLIC_API_URL` = `https://appifyglobalbackend-production.up.railway.app`
3. Add `NEXT_PUBLIC_USE_STATIC_DATA` = `false`
4. Save - Railway will auto-redeploy

## 🔧 Backend Service (AppifyGlobal_Backend)

**Go to Railway → AppifyGlobal_Backend → Variables**

**Should have:**
```
FRONTEND_URL=https://websitestagingnimeshan-production.up.railway.app
DATABASE_URL=(auto-set from Postgres)
OPENAI_API_KEY=(your key)
XAI_API_KEY=(your key)
```

## ⚠️ Why "localhost" appears

The code has `localhost` as a **fallback** if environment variables aren't set:
- Frontend: `process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"`
- Backend CORS: `process.env.FRONTEND_URL || "http://localhost:3000"`

**This is fine** - as long as you set the environment variables in Railway, they will override the localhost defaults.

## 🧪 Verify

After setting variables in Railway:
1. Wait for redeployment (2-3 min)
2. Visit: `https://websitestagingnimeshan-production.up.railway.app/news`
3. Open browser console (F12)
4. Check Network tab - API calls should go to `appifyglobalbackend-production.up.railway.app`, NOT localhost
