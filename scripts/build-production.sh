#!/bin/bash

set -e

echo "🏗️  Building production bundle..."
echo ""

# Clean previous builds
rm -rf .next out

# Build
npm run build

# Get build info
BUILD_SIZE=$(du -sh .next/ | cut -f1)
BUILD_TIME=$(date)

echo ""
echo "✅ Production build complete!"
echo ""
echo "Build Info:"
echo "  Size: $BUILD_SIZE"
echo "  Time: $BUILD_TIME"
echo "  Ready for deployment"
echo ""
