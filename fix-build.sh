#!/bin/bash

echo "🔧 Fixing build issues..."
echo ""

# Step 1: Clean everything
echo "1️⃣ Cleaning old build files and dependencies..."
rm -rf node_modules
rm -rf .next
rm -rf out
rm -f package-lock.json
echo "✅ Cleaned"
echo ""

# Step 2: Reinstall dependencies
echo "2️⃣ Reinstalling dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Check Node version
echo "3️⃣ Checking Node.js version..."
node --version
echo ""

# Step 4: Check if all required files exist
echo "4️⃣ Checking critical files..."
files=(
  "src/pages/_app.tsx"
  "src/pages/_document.tsx"
  "src/pages/index.tsx"
  "src/pages/poa1.tsx"
  "src/pages/poa2.tsx"
  "src/pages/poa3.tsx"
  "next.config.js"
  "tsconfig.json"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file MISSING"
  fi
done
echo ""

# Step 5: Try to build
echo "5️⃣ Attempting build..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 Build successful!"
  echo ""
  echo "Next steps:"
  echo "- Run 'npm run dev' to test locally"
  echo "- Or deploy to GitHub Pages using './deploy.sh'"
else
  echo ""
  echo "❌ Build failed. Please check the errors above."
  echo ""
  echo "Common fixes:"
  echo "1. Make sure Node.js version is 18 or higher: node --version"
  echo "2. Check if you're in the correct directory: pwd"
  echo "3. Verify all files from Mac Mini are copied correctly"
  echo "4. Try running: npm cache clean --force"
fi
