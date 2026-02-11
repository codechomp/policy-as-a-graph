# GitHub Pages Deployment Guide 🚀

> **⚠️ Build Failing?** If `npm run build` doesn't work, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) first!

## Quick Deployment (5 minutes)

### Method 1: Automatic Deployment with GitHub Actions ⚡ (RECOMMENDED)

**Step 1: Push to GitHub**
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Policy-as-Graph demo"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Step 2: Enable GitHub Pages**
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Click **Save**

**Step 3: Wait for Deployment**
- GitHub Actions will automatically build and deploy
- Check **Actions** tab to see progress
- Takes ~2-3 minutes
- Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**That's it!** Every push to `main` branch will auto-deploy.

---

### Method 2: Manual Deployment with gh-pages 📦

**Step 1: Install gh-pages**
```bash
npm install -g gh-pages
```

**Step 2: Build the site**
```bash
npm run build
```

**Step 3: Deploy**
```bash
gh-pages -d out
```

**Step 4: Enable GitHub Pages**
1. Go to repo **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / (root)
4. Save

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

### Method 3: Vercel/Netlify (Easiest) 🌐

**Vercel:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repo
4. Deploy → Done!

**Netlify:**
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the `/out` folder
3. Done!

---

## Configuration for GitHub Pages

### Update next.config.js

**Before deploying**, update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/YOUR_REPO_NAME',  // ← Change this!
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig
```

**Important**: Replace `/YOUR_REPO_NAME` with your actual GitHub repo name!

Example:
- Repo: `https://github.com/vipul/policy-demo`
- basePath: `/policy-demo`

**For custom domain or username.github.io**, use:
```javascript
basePath: '',  // Empty for custom domain
```

---

## Troubleshooting

### Issue: 404 Page Not Found

**Solution 1**: Check basePath
```javascript
// In next.config.js
basePath: '/YOUR_REPO_NAME',  // Must match repo name exactly
```

**Solution 2**: Check GitHub Pages source
- Settings → Pages → Source should be "GitHub Actions" or "gh-pages branch"

### Issue: Blank Page

**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: CSS/JS not loading

**Solution**: Verify basePath is correct
```bash
# View in browser DevTools → Network tab
# All URLs should start with /YOUR_REPO_NAME/
```

### Issue: Build fails

**Solution**: Check Node version
```bash
node --version  # Should be 18+
npm --version   # Should be 9+

# If old, update:
nvm install 18
nvm use 18
```

---

## Testing Locally Before Deploy

```bash
# Build
npm run build

# Serve locally to test
npx serve out

# Open http://localhost:3000
# Test all pages and features
```

---

## Custom Domain Setup (Optional)

1. Buy domain (e.g., from Namecheap, GoDaddy)
2. Add CNAME file to `/public`:
   ```
   yourdomain.com
   ```
3. Update next.config.js:
   ```javascript
   basePath: '',  // Empty for custom domain
   ```
4. In repo Settings → Pages:
   - Custom domain: `yourdomain.com`
   - Enforce HTTPS: ✓
5. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

---

## Deployment Checklist ✅

Before deploying:
- [ ] Update `basePath` in `next.config.js`
- [ ] Run `npm run build` locally to test
- [ ] Check all pages work correctly
- [ ] Test graph zoom/pan functionality
- [ ] Verify export buttons work
- [ ] Check responsive design on mobile
- [ ] Test in Chrome, Firefox, Safari

After deploying:
- [ ] Visit deployed URL
- [ ] Test all 4 pages
- [ ] Test graph interactions
- [ ] Check browser console for errors
- [ ] Share link with team!

---

## GitHub Actions Workflow

The workflow (in `.github/workflows/deploy.yml`) automatically:
1. Checks out code
2. Installs Node 18
3. Runs `npm ci` (clean install)
4. Runs `npm run build`
5. Uploads `/out` directory
6. Deploys to GitHub Pages

**View deployment logs**: 
- Repo → Actions tab → Click on workflow run

---

## Updating After Deployment

Just commit and push:
```bash
# Make your changes
git add .
git commit -m "Update graph colors"
git push

# GitHub Actions will auto-deploy
# Check Actions tab for progress
```

---

## Environment-Specific basePath

For automatic basePath detection:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/YOUR_REPO_NAME' : '',
  // Empty for local dev, set for production
}
```

Or use environment variables:
```javascript
basePath: process.env.BASE_PATH || '',
```

Then in GitHub Actions:
```yaml
- name: Build
  run: npm run build
  env:
    BASE_PATH: /YOUR_REPO_NAME
```

---

## Performance Tips

1. **Enable Gzip**: GitHub Pages does this automatically
2. **Check bundle size**: 
   ```bash
   npm run build
   du -sh out/*
   ```
3. **Optimize images**: Already using `unoptimized: true` for static export
4. **Lazy load graphs**: Already implemented with dynamic imports

---

## Security

- ✅ HTTPS enforced by GitHub Pages
- ✅ No backend = No server vulnerabilities
- ✅ Static files only
- ✅ No sensitive data in repo

---

## Monitoring

**Check deployment status**:
```bash
# View GitHub Actions logs
gh run list
gh run view --log

# Or visit:
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions
```

**Analytics** (optional):
- Add Google Analytics to `_document.tsx`
- Or use GitHub Pages built-in traffic stats (Settings → Insights)

---

## Summary

**Fastest method**: Push to GitHub → Enable GitHub Actions → Done!

**Your live URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**Example**:
- Username: `vipulg`
- Repo: `policy-graph-demo`
- URL: `https://vipulg.github.io/policy-graph-demo/`

---

**Need help?** Check these docs:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
