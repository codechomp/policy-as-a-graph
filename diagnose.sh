#!/bin/bash

echo "🔍 Diagnostic Script for Build Issues"
echo "======================================"
echo ""

# Check Node and npm versions
echo "📦 Environment:"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "PWD: $(pwd)"
echo ""

# Check if NODE_ENV is set to something weird
echo "🌍 Environment Variables:"
if [ -z "$NODE_ENV" ]; then
  echo "✅ NODE_ENV is not set (good)"
else
  echo "⚠️  NODE_ENV is set to: $NODE_ENV"
  echo "   (This might cause issues. Try: unset NODE_ENV)"
fi
echo ""

# Check package.json
echo "📄 Package.json scripts:"
if [ -f "package.json" ]; then
  echo "✅ package.json exists"
  cat package.json | grep -A 5 '"scripts"'
else
  echo "❌ package.json NOT FOUND!"
fi
echo ""

# Check next.config.js
echo "⚙️  Next.js Configuration:"
if [ -f "next.config.js" ]; then
  echo "✅ next.config.js exists"
  cat next.config.js
else
  echo "❌ next.config.js NOT FOUND!"
fi
echo ""

# Check critical files
echo "📁 Critical Files Check:"
files=(
  "src/pages/_app.tsx"
  "src/pages/_document.tsx"
  "src/pages/index.tsx"
  "src/pages/poa1.tsx"
  "src/pages/poa2.tsx"
  "src/pages/poa3.tsx"
  "src/components/GraphViewer.tsx"
  "tsconfig.json"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
    # Check for useRouter usage in pages
    if [[ $file == src/pages/*.tsx ]]; then
      if grep -q "useRouter()" "$file" 2>/dev/null; then
        echo "   ⚠️  WARNING: Contains useRouter() - might cause SSG issues"
      fi
    fi
  else
    echo "❌ $file MISSING"
  fi
done
echo ""

# Check _document.tsx for Html import issues
echo "🔍 Checking _document.tsx imports:"
if [ -f "src/pages/_document.tsx" ]; then
  echo "First 5 lines of _document.tsx:"
  head -5 src/pages/_document.tsx

  # Check if Html is imported correctly
  if grep -q "from 'next/document'" src/pages/_document.tsx; then
    echo "✅ Correct import from 'next/document'"
  else
    echo "❌ INCORRECT import!"
  fi
else
  echo "❌ _document.tsx NOT FOUND"
fi
echo ""

# Check if node_modules exists
echo "📦 Dependencies:"
if [ -d "node_modules" ]; then
  echo "✅ node_modules exists"
  if [ -d "node_modules/next" ]; then
    echo "✅ Next.js installed: $(cat node_modules/next/package.json | grep '"version"' | head -1)"
  else
    echo "❌ Next.js NOT in node_modules!"
  fi
else
  echo "❌ node_modules NOT FOUND - run 'npm install'"
fi
echo ""

# Check .next directory
echo "🏗️  Build artifacts:"
if [ -d ".next" ]; then
  echo "⚠️  .next directory exists (old build)"
  echo "   Recommendation: Delete with 'rm -rf .next'"
else
  echo "✅ No old .next directory"
fi
echo ""

echo "======================================"
echo "🎯 Recommendations:"
echo ""
echo "If you see errors above, try these steps IN ORDER:"
echo ""
echo "1. If NODE_ENV is set:"
echo "   unset NODE_ENV"
echo ""
echo "2. Clean everything:"
echo "   rm -rf node_modules .next out package-lock.json"
echo ""
echo "3. Reinstall:"
echo "   npm install"
echo ""
echo "4. Build:"
echo "   npm run build"
echo ""
echo "Or just run: ./fix-build.sh"
echo ""
