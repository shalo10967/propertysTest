#!/bin/bash

echo "🚀 ProyectoTest - Setup Script"
echo "=============================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm no está instalado. Instalando..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm --version) detectado"

# Check .NET
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK no está instalado. Por favor instala .NET SDK 9"
    exit 1
fi

echo "✅ .NET $(dotnet --version) detectado"

# Check MongoDB
if ! command -v mongosh &> /dev/null && ! command -v docker &> /dev/null; then
    echo "⚠️  MongoDB o Docker no detectados"
    echo "   Puedes instalar MongoDB o usar Docker Compose"
fi

# Install frontend dependencies
echo ""
echo "📦 Instalando dependencias del frontend..."
pnpm install

# Restore backend dependencies
echo ""
echo "📦 Restaurando dependencias del backend..."
cd apps/backend/ProyectoTest.API
dotnet restore
cd ../../..

echo ""
echo "✅ Setup completado!"
echo ""
echo "Para iniciar el proyecto:"
echo "1. Inicia MongoDB: docker-compose up -d"
echo "2. Inicia el backend: cd apps/backend/ProyectoTest.API && dotnet run"
echo "3. Inicia el frontend: pnpm dev"
echo ""
echo "O lee QUICKSTART.md para más detalles"

