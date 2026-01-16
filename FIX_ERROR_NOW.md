# 🔧 Fix "getCLS is not a function" Error - Step by Step

## ⚠️ Current Error
```
Error: getCLS is not a function
```

## ✅ Solution (Follow These Steps)

### Step 1: Stop the Dev Server
Press `Ctrl + C` in your terminal to stop the running dev server.

### Step 2: Clear Cache (Choose One Method)

#### Method A: Use the Batch File (Easiest)
```bash
# Double-click this file:
CLEAR_CACHE.bat

# Then run:
npm run dev
```

#### Method B: Manual Commands
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
npm run dev

# Windows CMD
rmdir /s /q .next
npm run dev
```

#### Method C: Complete Clean (If above doesn't work)
```bash
# Stop all Node processes
taskkill /F /IM node.exe

# Remove cache directories
rmdir /s /q .next
rmdir /s /q node_modules\.cache

# Reinstall dependencies (only if needed)
# rmdir /s /q node_modules
# npm install

# Start dev server
npm run dev
```

### Step 3: Verify Fix
1. Open http://localhost:3000
2. Open DevTools (F12)
3. Check Console tab
4. You should see: `Web Vital: { name: 'CLS', value: 0.001, rating: 'good' }`
5. No errors!

---

## 🎯 Why This Happens

The error occurs because:
1. **Turbopack caches** compiled code in `.next` directory
2. The old code used `getCLS()` (web-vitals v2 API)
3. We updated to `onCLS()` (web-vitals v5 API)
4. But Turbopack is still using the cached old code

**Solution:** Delete `.next` folder to force recompilation.

---

## 🚨 If Error Persists

### Check 1: Verify File Content
Open `lib/analytics.ts` and ensure it has:
```typescript
const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

onCLS(sendToAnalytics);  // ✅ Should be onCLS, not getCLS
```

### Check 2: Verify web-vitals Version
```bash
npm list web-vitals
# Should show: web-vitals@5.1.0
```

### Check 3: Complete Reinstall
```bash
# Remove everything
rmdir /s /q .next
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install

# Start fresh
npm run dev
```

---

## 📝 Quick Reference

### ❌ Old API (Causes Error)
```typescript
import { getCLS, getFID } from 'web-vitals';
getCLS(callback);  // ❌ Error!
```

### ✅ New API (Correct)
```typescript
import { onCLS, onINP } from 'web-vitals';
onCLS(callback);  // ✅ Works!
```

---

## 🎉 Success Checklist

- [ ] Dev server stopped
- [ ] `.next` folder deleted
- [ ] Dev server restarted with `npm run dev`
- [ ] Page loads without errors
- [ ] Console shows "Web Vital:" logs
- [ ] No "getCLS is not a function" error

---

## 💡 Pro Tip

**Always clear cache when updating dependencies or changing import statements!**

```bash
# Add this to your workflow:
rm -rf .next && npm run dev
```

---

**Need Help?** 
- Check `lib/analytics.ts` has the correct code
- Ensure `.next` folder is completely deleted
- Try restarting your computer if all else fails

---

**Status:** Ready to Fix  
**Time to Fix:** 30 seconds  
**Difficulty:** Easy
