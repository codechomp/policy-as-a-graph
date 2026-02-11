# 🚨 Fix Office Machine Build Errors

## The Problem

Your Mac Mini builds successfully, but office machine shows:
```
Error: <Html> should not be imported outside of pages/_document
Error: NextRouter was not mounted
Warning: Non-standard NODE_ENV
```

## The Solution (2 Minutes)

### Option 1: Quick Automated Fix ✨

```bash
cd /path/to/shark-policyasagraph

# Run diagnostics
./diagnose.sh

# Run fix
./fix-build.sh
```

This will:
1. ✅ Clean all old build files and dependencies
2. ✅ Reinstall fresh node_modules
3. ✅ Rebuild the project
4. ✅ Verify the build succeeded

### Option 2: Manual Fix (if scripts don't work)

```bash
# Step 1: Clean everything
rm -rf node_modules
rm -rf .next
rm -rf out
rm -f package-lock.json

# Step 2: Check NODE_ENV
echo $NODE_ENV
# If it shows anything, run: unset NODE_ENV

# Step 3: Reinstall
npm install

# Step 4: Build
npm run build
```

## Why This Happens

The most common causes:

1. **Different Node.js versions** between Mac and office PC
   - Check: `node --version`
   - Need: Node.js 18+

2. **Corrupted node_modules** from partial sync or interrupted install
   - Fix: Delete and reinstall

3. **Old build cache** from previous failed builds
   - Fix: Delete `.next` directory

4. **NODE_ENV variable** set to non-standard value
   - Fix: `unset NODE_ENV`

5. **File sync issues** - some files didn't copy correctly
   - Fix: Use Git or re-copy entire project

## Verification

After running the fix, you should see:

```bash
✓ Generating static pages (4/4)
✓ Finalizing page optimization

Export successful. Files written to /path/to/shark-policyasagraph/out
```

Then test locally:
```bash
npm run dev
# Visit http://localhost:3000
```

## Still Not Working?

1. **Compare environments:**
   ```bash
   # On Mac Mini
   node --version > mac-versions.txt
   npm --version >> mac-versions.txt

   # On Office PC
   node --version > office-versions.txt
   npm --version >> office-versions.txt
   ```

2. **Check file integrity:**
   ```bash
   # Make sure these files exist and are identical:
   ls -lah src/pages/_document.tsx
   ls -lah src/pages/_app.tsx
   ls -lah next.config.js
   ```

3. **Use fresh copy from Mac Mini:**
   ```bash
   # On Mac Mini (in project root)
   tar -czf shark-clean.tar.gz --exclude=node_modules --exclude=.next --exclude=out .

   # Transfer shark-clean.tar.gz to office machine, then:
   mkdir shark-policyasagraph-fresh
   cd shark-policyasagraph-fresh
   tar -xzf ../shark-clean.tar.gz
   npm install
   npm run build
   ```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./diagnose.sh` | Check what's wrong |
| `./fix-build.sh` | Auto-fix common issues |
| `npm run build` | Build static site |
| `npm run dev` | Test locally |
| `rm -rf node_modules .next` | Clean everything |

## Need More Help?

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed explanations and advanced troubleshooting.
