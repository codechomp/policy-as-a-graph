# Setup Instructions

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Local Development Setup

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

4. **Navigate the demo**
   - Start at the homepage (Attestation Form)
   - Check the logging attestation and click "Attest"
   - View compliance results on POA Page 1
   - Click "Explain Non-Compliance" to see detailed analysis
   - Explore the graphs, logs, and policy-as-code pages

## Build for Production (GitHub Pages)

1. **Update `next.config.js`** 
   
   Change `basePath` to match your GitHub repository name:
   ```javascript
   basePath: '/your-repo-name',  // e.g., '/policy-as-graph-demo'
   ```

2. **Build the static site**
   ```bash
   npm run build
   ```
   
   This creates an `out/` directory with all static files

3. **Test the build locally**
   ```bash
   # Install a simple HTTP server
   npm install -g serve
   
   # Serve the static build
   serve out
   ```

4. **Deploy to GitHub Pages**
   
   **Option A: GitHub Actions (Recommended)**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```
   
   **Option B: Manual Deployment**
   
   ```bash
   # Build the site
   npm run build
   
   # Push the out/ directory to gh-pages branch
   npm install -g gh-pages
   gh-pages -d out
   ```

5. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Click Save

6. **Access your site**
   - URL: `https://[username].github.io/[repo-name]/`

## Troubleshooting

### Issue: "Module not found" errors

**Solution**: Ensure all dependencies are installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Blank page after deployment

**Solution**: Check `basePath` in `next.config.js` matches your repo name

### Issue: Graph not rendering

**Solution**: This is a client-side component using Canvas. Ensure JavaScript is enabled in browser.

### Issue: Build fails with TypeScript errors

**Solution**: Run TypeScript check
```bash
npx tsc --noEmit
```

Fix any type errors reported.

## Performance Optimization

For production, consider:

1. **Minimize basePath updates** - Use environment variables
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/policy-as-graph-demo' : '',
   ```

2. **Add loading states** - Especially for graph rendering

3. **Optimize graph rendering** - For very large graphs (100+ nodes), consider:
   - WebGL-based rendering (e.g., sigma.js)
   - Graph virtualization
   - Progressive loading

## Development Tips

1. **Hot reload works** - Changes to pages auto-refresh

2. **Data changes require browser refresh** - Changes to JSON files in `/data` need manual refresh

3. **Graph debugging** - Open browser DevTools → Console to see graph render logs

4. **Policy engine testing** - Check console for evaluation results

## File Structure Reference

```
/
├── data/                    # Static data (policies, graphs, logs)
├── src/
│   ├── pages/              # Next.js pages (routes)
│   ├── components/         # React components
│   ├── lib/                # Business logic (policy engine)
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets (if any)
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Customization Guide

### Add a new policy

1. Create `/data/policies/techXX_XX.json` with same structure as `tech05_01.json`
2. Create graphs in `/data/graphs/`
3. Update policy engine in `src/lib/policyEngine.ts` to add new rules
4. Create new page(s) or update existing ones

### Add new graph relationships

Edit `/data/graphs/*.json` and add new edges with appropriate types:
- `relate_to`, `mention`, `hyperlink_to`, `mention_in_context`, `maps_to`
- `has_section`, `has_requirement`, `requires`, `evidenced_by`, `violated_by`, `supported_by`

### Modify UI styling

Edit `src/styles/globals.css` for global styles or add inline styles in components.

### Change graph colors

Edit `GraphViewer.tsx` → `colorMap` object to change node colors by type.

## Support

For issues or questions:
1. Check this setup guide
2. Review README.md for architecture details
3. Check DEMO_SCRIPT.md for usage examples
4. Open an issue on GitHub (if applicable)
