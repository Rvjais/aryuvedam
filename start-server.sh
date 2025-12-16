#!/bin/bash

# 🌿 Aaryuvedam Website - Quick Launch Script

echo "🌿 Starting Aaryuvedam Royal Ayurveda Website..."
echo ""
echo "✨ Royal Design Features:"
echo "  • Emerald & Gold color scheme"
echo "  • Premium typography (Playfair Display)"
echo "  • Smooth animations & transitions"
echo "  • Glassmorphism effects"
echo "  • Fully responsive design"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🚀 Launching website on http://localhost:8000"
    echo ""
    echo "📱 Opening in your default browser..."
    sleep 2
    
    # Open browser
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:8000" &
    elif command -v open &> /dev/null; then
        open "http://localhost:8000" &
    fi
    
    # Start server
    python3 -m http.server 8000
else
    echo "❌ Python 3 not found. Please install Python 3 or manually open index.html in your browser."
fi
