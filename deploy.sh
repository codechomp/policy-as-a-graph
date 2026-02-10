#!/bin/bash

# Quick Deploy Script for GitHub Pages
# Usage: ./deploy.sh

echo "🚀 Policy-as-Graph Demo - GitHub Pages Deployment"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Check if gh-pages is installed
if ! command -v gh-pages &> /dev/null; then
    echo "📦 Installing gh-pages..."
    npm install -g gh-pages
fi

# Deploy
echo "🚀 Deploying to GitHub Pages..."
gh-pages -d out

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "Your site will be live at:"
    echo "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/"
    echo ""
    echo "Note: It may take a few minutes to appear."
    echo ""
    echo "Next steps:"
    echo "1. Go to your repo Settings → Pages"
    echo "2. Set source to 'gh-pages' branch"
    echo "3. Wait for deployment to complete"
else
    echo "❌ Deployment failed. Check the error above."
    exit 1
fi
