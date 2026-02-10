# All Commands Reference

Quick reference for all npm commands and useful operations.

## 📦 Installation

```bash
# Install all dependencies
npm install

# Clean install (if issues)
rm -rf node_modules package-lock.json && npm install
```

## 🚀 Development

```bash
# Start development server (http://localhost:3000)
npm run dev

# The dev server includes:
# - Hot reload on file changes
# - Error overlay
# - Source maps for debugging
```

## 🏗️ Building

```bash
# Build for production (static export)
npm run build

# Output: /out directory with all static files
```

## ✅ Linting & Type Checking

```bash
# Run Next.js linter
npm run lint

# Type check without emitting files
npx tsc --noEmit

# Check all TypeScript files
npx tsc --noEmit --project tsconfig.json
```

## 🧪 Testing (Manual)

```bash
# Run dev server and test in browser
npm run dev

# Test build locally with serve
npm install -g serve
npm run build
serve out

# Open http://localhost:3000 (or port shown)
```

## 📊 Build Analysis

```bash
# Check bundle size
npm run build
du -sh out/*

# List all files in build
find out -type f | wc -l

# Check gzipped sizes
gzip -c out/_next/static/chunks/*.js | wc -c
```

## 🔍 Code Exploration

```bash
# Count lines of code
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l

# Find TypeScript files
find src -name "*.ts" -o -name "*.tsx"

# Find all JSON data files
find data -name "*.json"

# Search for specific text in codebase
grep -r "PolicyEngine" src/
```

## 🗂️ File Operations

```bash
# View policy JSON structure
cat data/policies/tech05_01.json | jq .

# Count nodes in graph
cat data/graphs/tech05_01_requirements.json | jq '.nodes | length'

# Count edges in graph
cat data/graphs/tech05_01_related.json | jq '.edges | length'

# Count non-compliant logs
cat data/logs/sample.json | jq '.logs | map(select(.compliant == false)) | length'

# View specific log entry
cat data/logs/sample.json | jq '.logs[0]'
```

## 🌐 GitHub Pages Deployment

```bash
# Option 1: Manual deployment
npm run build
npm install -g gh-pages
gh-pages -d out

# Option 2: Using git subtree
npm run build
git subtree push --prefix out origin gh-pages

# Option 3: GitHub Actions (create .github/workflows/deploy.yml)
# See SETUP.md for full workflow file
```

## 🔧 Troubleshooting Commands

```bash
# Clear Next.js cache
rm -rf .next

# Clear build output
rm -rf out

# Clean everything and reinstall
rm -rf .next out node_modules package-lock.json
npm install

# Check Node/npm versions
node --version  # Should be 18+
npm --version   # Should be 9+

# Verify all JSON files are valid
find data -name "*.json" -exec echo "Checking {}" \; -exec jq empty {} \;

# Check for TypeScript errors
npx tsc --noEmit

# Check disk space
df -h .
```

## 📸 Screenshots & Documentation

```bash
# Generate project tree (for documentation)
tree -L 3 -I 'node_modules|.next|out' > TREE.txt

# Count files by type
find . -name "*.ts" | wc -l
find . -name "*.tsx" | wc -l
find . -name "*.json" | wc -l
find . -name "*.md" | wc -l

# Calculate total lines of documentation
cat *.md | wc -l

# List all documentation files
ls -lh *.md
```

## 🎨 Customization Commands

```bash
# Add new policy file
cat > data/policies/tech09_15.json << 'EOF'
{
  "id": "TECH09.15",
  "name": "Authentication and Authorization Management Standard",
  ...
}
