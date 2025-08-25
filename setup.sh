#!/bin/bash

# Data Science Navigator Setup Script
echo "🚀 Setting up Data Science Navigator..."

# Create project directory
mkdir -p data-science-navigator
cd data-science-navigator

# Create folder structure
mkdir -p src/{components,pages,utils}
mkdir -p public

echo "📁 Created project structure"

# Initialize npm project
npm init -y

echo "📦 Installing dependencies..."

# Install dependencies
npm install react@^18.3.1 react-dom@^18.3.1 react-router-dom@^7.8.2
npm install lucide-react@^0.344.0 html2canvas@^1.4.1 jspdf@^3.0.1
npm install file-saver@^2.0.5 mammoth@^1.10.0 pdf-parse@^1.1.1
npm install @types/file-saver@^2.0.7 @types/pdf-parse@^1.1.5

# Install dev dependencies
npm install -D @vitejs/plugin-react@^4.3.1 vite@^5.4.2 typescript@^5.5.3
npm install -D @types/react@^18.3.5 @types/react-dom@^18.3.0
npm install -D tailwindcss@^3.4.1 autoprefixer@^10.4.18 postcss@^8.4.35
npm install -D eslint@^9.9.1 typescript-eslint@^8.3.0

echo "✅ Dependencies installed!"
echo "📝 Next steps:"
echo "1. Copy all the source files from the project"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:5173 in your browser"