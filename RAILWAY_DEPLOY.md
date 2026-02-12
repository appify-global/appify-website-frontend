# Railway Frontend Deployment Guide

## ✅ Code Pushed to GitHub

The frontend code has been pushed to GitHub. Railway should auto-deploy.

## 🔧 Configure Railway Environment Variables

1. **Go to Railway Dashboard:**
   - Visit: https://railway.com/project/78bd5091-3246-433e-9a79-20b1f001fde1
   - Click on **"Website.Staging.Nimes..."** service

2. **Navigate to Variables Tab:**
   - Click on **"Variables"** in the top navigation

3. **Add/Update These Environment Variables:**

   ```
   NEXT_PUBLIC_API_URL=https://appifyglobalbackend-production.up.railway.app
   NEXT_PUBLIC_USE_STATIC_DATA=false
   ```

4. **Save Changes:**
   - Railway will automatically redeploy when you save variables

## 📋 Environment Variables Explained

- **`NEXT_PUBLIC_API_URL`**: Points to your Railway backend API
- **`NEXT_PUBLIC_USE_STATIC_DATA`**: Set to `false` to use API, `true` to use static data (rollback)

## 🚀 Deployment Status

After setting variables:
- Railway will automatically trigger a new deployment
- Check the **"Deployments"** tab to see the build progress
- Once deployed, visit your frontend URL to test

## 🧪 Testing After Deployment

1. Visit your frontend URL: `https://websitestagingnimeshan-production.up.railway.app/news`
2. Check browser console for any API errors
3. Verify articles are loading from the Railway backend

## 🔄 Rollback (If Needed)

If you need to rollback to static data:
1. Go to Railway → Variables
2. Set `NEXT_PUBLIC_USE_STATIC_DATA=true`
3. Save (will auto-redeploy)

## 📝 Notes

- The frontend will automatically fallback to static data if the API fails
- Make sure your Railway backend is running and accessible
- Check Railway backend logs if articles aren't showing
