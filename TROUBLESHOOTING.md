# 🔧 Troubleshooting Build Errors

## Your Current Issue

Your Mac Mini build works perfectly, but the office machine shows these errors:
- `<Html> should not be imported outside of pages/_document`
- `NextRouter was not mounted`
- Non-standard NODE_ENV warning

## Quick Fix (Try This First!)

```bash
# Run the diagnostic script
./diagnose.sh

# Then run the fix script
./fix-build.sh
```

## Manual Steps (If Scripts Don't Work)

### Step 1: Clean Everything
```bash
rm -rf node_modules
rm -rf .next
rm -rf out
rm -f package-lock.json
```

### Step 2: Check Environment Variable
```bash
# Check if NODE_ENV is causing issues
echo $NODE_ENV

# If it shows anything other than empty, unset it:
unset NODE_ENV
```

### Step 3: Reinstall Dependencies
```bash
npm install
```

### Step 4: Build Again
```bash
npm run build
```

## Common Causes & Solutions

### 1. Different Node.js Versions
**Check:**
```bash
node --version
```

**Solution:** Make sure both machines use Node.js 18 or higher. Install from: https://nodejs.org/

### 2. Corrupted node_modules
**Symptoms:** Random import errors, NextRouter not mounted

**Solution:** Delete `node_modules` and reinstall (see Manual Steps above)

### 3. Old Build Cache
**Symptoms:** Build succeeds once but fails later

**Solution:**
```bash
rm -rf .next
npm run build
```

### 4. NODE_ENV Set Incorrectly
**Symptoms:** "Non-standard NODE_ENV" warning

**Solution:**
```bash
unset NODE_ENV
npm run build
```

### 5. Files Not Synced Correctly
**Check if these files exist and match Mac Mini:**
- `src/pages/_app.tsx`
- `src/pages/_document.tsx`
- `src/pages/index.tsx`
- `src/pages/poa1.tsx`
- `src/pages/poa2.tsx`
- `src/pages/poa3.tsx`
- `next.config.js`

**Solution:** Re-copy files from Mac Mini or use Git to ensure consistency

### 6. Wrong Directory
**Symptoms:** "Cannot find package.json"

**Solution:**
```bash
# Make sure you're in the project root
cd /path/to/shark-policyasagraph
pwd  # Should show the project directory
ls   # Should show package.json
```

## Still Not Working?

### Option 1: Copy Clean Files from Mac Mini

On Mac Mini:
```bash
# Create a fresh export
npm run build
tar -czf shark-policyasagraph-clean.tar.gz .
```

Transfer the tar.gz to office machine, then:
```bash
tar -xzf shark-policyasagraph-clean.tar.gz
cd shark-policyasagraph
npm install
npm run build
```

### Option 2: Use Git

If using Git:
```bash
# Office machine
git status  # Check for uncommitted changes
git reset --hard origin/main  # Reset to match repository
rm -rf node_modules .next
npm install
npm run build
```

### Option 3: Compare Files

Run diagnostic on BOTH machines and compare:

Mac Mini:
```bash
./diagnose.sh > mac-mini-diagnostic.txt
```

Office machine:
```bash
./diagnose.sh > office-diagnostic.txt
```

Then compare the two files to find differences.

## Verification

After fixing, verify it works:

```bash
# 1. Build should succeed
npm run build
# Output should say: "✓ Generating static pages"

# 2. Test locally
npm run dev
# Visit http://localhost:3000

# 3. Check static export
ls out/
# Should show: index.html, poa1.html, poa2.html, poa3.html
```

## Contact

If none of these work, the diagnostic output will help identify the exact issue. Run `./diagnose.sh` and share the output.
