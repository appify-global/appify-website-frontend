# Frontend Not Showing Articles - Fix Checklist

## ✅ Fixed Issues

1. **CORS** - Updated to allow Railway frontend URL
2. **Error Logging** - Improved to see actual errors

## 🔍 Check These in Railway

### Backend Service (AppifyGlobal_Backend)
1. **Variables Tab:**
   - ✅ `FRONTEND_URL` = `https://websitestagingnimeshan-production.up.railway.app`
   - ✅ `DATABASE_URL` (should be auto-set from Postgres)
   - ✅ `OPENAI_API_KEY`
   - ✅ `XAI_API_KEY`

2. **Deployments Tab:**
   - Wait for latest deployment to complete (with CORS fix)

### Frontend Service (Website.Staging.Nimeshan)
1. **Variables Tab - MUST HAVE:**
   - ✅ `NEXT_PUBLIC_API_URL` = `https://appifyglobalbackend-production.up.railway.app`
   - ✅ `NEXT_PUBLIC_USE_STATIC_DATA` = `false` (or remove it)

2. **If variables are missing:**
   - Add them in Railway → Variables
   - Railway will auto-redeploy

## 🧪 Test After Deployment

1. **Wait 2-3 minutes** for Railway to deploy both services

2. **Test Backend API:**
   ```bash
   curl https://appifyglobalbackend-production.up.railway.app/api/news?status=published
   ```

3. **Check Frontend:**
   - Visit: `https://websitestagingnimeshan-production.up.railway.app/news`
   - Open browser console (F12)
   - Look for:
     - API fetch errors
     - CORS errors
     - Network tab → Check if API calls are being made

## 🐛 Common Issues

1. **Still showing static data:**
   - Check `NEXT_PUBLIC_USE_STATIC_DATA` is `false` or not set
   - Clear browser cache

2. **CORS errors:**
   - Backend should now allow Railway frontend URL
   - Check Railway logs if still failing

3. **500 errors:**
   - Check Railway backend logs for actual error
   - May be database connection issue

4. **No articles:**
   - Articles need to be published (status = "published")
   - Check if articles exist in database
