#!/bin/bash

echo "🎨 Fixing CSS Not Loading Issue..."
echo ""

# Step 1: Stop any running dev server
echo "1️⃣ Stopping any running dev servers..."
pkill -f "next dev" 2>/dev/null || true
sleep 2
echo "✅ Stopped"
echo ""

# Step 2: Clean Next.js cache
echo "2️⃣ Cleaning Next.js cache..."
rm -rf .next
rm -rf out
echo "✅ Cleaned"
echo ""

# Step 3: Check if globals.css exists
echo "3️⃣ Checking CSS file..."
if [ -f "src/styles/globals.css" ]; then
  echo "✅ globals.css exists ($(wc -l < src/styles/globals.css) lines)"
else
  echo "❌ globals.css MISSING!"
  exit 1
fi
echo ""

# Step 4: Check _app.tsx import
echo "4️⃣ Checking _app.tsx CSS import..."
if grep -q "import '@/styles/globals.css'" src/pages/_app.tsx; then
  echo "✅ CSS import found in _app.tsx"
else
  echo "❌ CSS import MISSING in _app.tsx!"
  exit 1
fi
echo ""

# Step 5: Start fresh dev server
echo "5️⃣ Starting fresh dev server..."
echo ""
echo "📢 IMPORTANT: After this starts, open browser in INCOGNITO/PRIVATE mode"
echo "   to avoid cache issues!"
echo ""
echo "   URL: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server when done testing"
echo ""
sleep 3

npm run dev
