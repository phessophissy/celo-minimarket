#!/bin/bash

# Script to update the contract address in the frontend

echo "🔧 CeloMiniMarket Contract Address Updater"
echo "=========================================="
echo ""

# Check if address is provided
if [ -z "$1" ]; then
    echo "❌ Error: No contract address provided"
    echo ""
    echo "Usage: ./update-contract-address.sh <NEW_CONTRACT_ADDRESS>"
    echo "Example: ./update-contract-address.sh 0x1234567890abcdef1234567890abcdef12345678"
    exit 1
fi

NEW_ADDRESS=$1

# Validate address format (basic check)
if [[ ! $NEW_ADDRESS =~ ^0x[a-fA-F0-9]{40}$ ]]; then
    echo "❌ Error: Invalid Ethereum address format"
    echo "Address must be 42 characters starting with 0x"
    exit 1
fi

echo "📝 New Contract Address: $NEW_ADDRESS"
echo ""

# Update App.jsx
APP_FILE="frontend/src/App.jsx"

if [ ! -f "$APP_FILE" ]; then
    echo "❌ Error: $APP_FILE not found"
    exit 1
fi

# Create backup
cp "$APP_FILE" "${APP_FILE}.backup"
echo "✓ Backup created: ${APP_FILE}.backup"

# Update the contract address
sed -i "s/const MARKET_ADDRESS = '0x[a-fA-F0-9]\{40\}'/const MARKET_ADDRESS = '$NEW_ADDRESS'/g" "$APP_FILE"

echo "✓ Contract address updated in $APP_FILE"

# Update ABI
echo ""
echo "📦 Updating ABI..."
if [ -f "frontend/src/abi/CeloMiniMarket-NEW.json" ]; then
    cp frontend/src/abi/CeloMiniMarket-NEW.json frontend/src/abi/CeloMiniMarket.json
    echo "✓ ABI updated"
else
    echo "⚠️  Warning: New ABI file not found. Using existing ABI."
fi

echo ""
echo "✅ Update complete!"
echo ""
echo "Next steps:"
echo "1. Restart your frontend server (npm run dev)"
echo "2. Test the connection with your new contract"
echo ""
echo "To revert changes, run:"
echo "   cp ${APP_FILE}.backup $APP_FILE"
