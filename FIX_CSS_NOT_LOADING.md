# 🎨 Fix: CSS Not Loading (UI Broken)

## The Problem

Your screenshot shows:
- Text overlapping
- No spacing/padding
- Checkboxes not aligned
- Missing colors and styles
- **CSS is not loading!**

## Quick Fix (2 Minutes)

### Step 1: Stop Dev Server
```bash
# Press Ctrl+C in terminal where dev server is running
# Or run:
pkill -f "next dev"
```

### Step 2: Clean Cache
```bash
cd /path/to/shark-policyasagraph

# Delete cache
rm -rf .next
rm -rf out
rm -rf .next/cache
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

### Step 4: Clear Browser Cache
**Option A: Use Incognito/Private Window**
- Chrome: Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac)
- Visit: http://localhost:3000

**Option B: Hard Refresh**
- Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Step 5: Check Console
1. Open Browser DevTools (F12)
2. Go to **Console** tab
3. Look for CSS errors
4. Go to **Network** tab
5. Check if `globals.css` loads (should be 200 status)

## Automated Fix

Run this script on office machine:

```bash
./fix-css-not-loading.sh
```

It will:
1. ✅ Stop running dev servers
2. ✅ Clean .next cache
3. ✅ Verify CSS files exist
4. ✅ Start fresh dev server
5. ✅ Remind you to use Incognito mode

## If Still Not Working

### Check 1: Verify CSS File
```bash
# Should show 244 lines
wc -l src/styles/globals.css

# Should show CSS content
head -20 src/styles/globals.css
```

Expected output:
```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
...
```

### Check 2: Verify _app.tsx Import
```bash
# Should show the import line
grep "globals.css" src/pages/_app.tsx
```

Expected output:
```typescript
import '@/styles/globals.css';
```

### Check 3: Check tsconfig.json Paths
```bash
cat tsconfig.json | grep -A 5 "paths"
```

Expected output:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

### Check 4: Browser Console Errors

Open DevTools (F12) → Console tab

**If you see:**
- `Failed to load resource: globals.css` → Path issue
- `Module not found: Can't resolve '@/styles/globals.css'` → tsconfig issue
- No errors but still broken → Browser cache issue

## Common Causes

| Symptom | Cause | Fix |
|---------|-------|-----|
| CSS worked before, now broken | Browser cache | Hard refresh (Ctrl+Shift+R) |
| Never worked on this machine | Missing files or wrong path | Re-sync files from Mac Mini |
| Works in Incognito, not normal | Browser cache issue | Clear browser cache |
| Dev server crashes on start | Port already in use | Kill process on port 3000 |

## Manual CSS Load Test

Create this test file to verify CSS loads:

```bash
cat > test-css.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="http://localhost:3000/_next/static/css/app/layout.css">
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>CSS Test</h1>
      <button class="button">Test Button</button>
    </div>
  </div>
</body>
</html>
EOF

# Open this file in browser
# If styles apply, CSS server is working
```

## Port Conflict Issue

If dev server won't start:

```bash
# Check what's using port 3000
lsof -i :3000

# Kill it
kill -9 $(lsof -t -i :3000)

# Or use different port
npm run dev -- -p 3001
# Then visit: http://localhost:3001
```

## Still Broken? Nuclear Option

```bash
# Delete EVERYTHING and start fresh
rm -rf node_modules
rm -rf .next
rm -rf out
rm -f package-lock.json

# Reinstall
npm install

# Start dev server
npm run dev

# Open in INCOGNITO mode
# Visit: http://localhost:3000
```

## Verification Checklist

After fix, you should see:
- ✅ Blue header with "Application Entitlement Manager"
- ✅ White card with proper padding
- ✅ Checkboxes aligned with labels
- ✅ Blue links for TECH standards
- ✅ "Go Back" and "Attest" buttons styled
- ✅ Proper spacing between elements

## Screenshot Comparison

### Before (Your Screenshot):
- Text overlapping
- No colors
- No spacing
- Broken layout

### After (Should Look Like):
- Clean blue header
- White card with shadow
- Proper checkbox alignment
- Styled buttons
- Professional layout

## Quick Commands

```bash
# Clean and restart
rm -rf .next && npm run dev

# Check if CSS file exists
ls -lh src/styles/globals.css

# Check if dev server is running
ps aux | grep "next dev"

# Check port 3000
lsof -i :3000
```

---

**TL;DR:** Run `./fix-css-not-loading.sh` then open http://localhost:3000 in **Incognito/Private window**
