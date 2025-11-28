#!/bin/bash

# GYM Management System Deployment Script
# This script helps deploy the application to production

echo "🚀 Starting GYM Management System Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js and npm are installed ✓"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    print_status "MongoDB is available ✓"
else
    print_warning "MongoDB not found locally. Make sure your MongoDB connection string is correct."
fi

# Backend Setup
print_status "Setting up backend..."
cd GMS-SERVER

# Check if .env exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your production configuration before running the server."
    else
        print_error ".env.example not found. Please create .env file manually."
        exit 1
    fi
fi

# Install backend dependencies
print_status "Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install backend dependencies"
    exit 1
fi

print_status "Backend setup complete ✓"

# Frontend Setup
print_status "Setting up frontend..."
cd ../CodeForCode

# Check if .env exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your production configuration."
    else
        print_error ".env.example not found. Please create .env file manually."
        exit 1
    fi
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install frontend dependencies"
    exit 1
fi

print_status "Frontend setup complete ✓"

# Build frontend for production
print_status "Building frontend for production..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Failed to build frontend"
    exit 1
fi

print_status "Frontend build complete ✓"

# Go back to root directory
cd ..

print_status "🎉 Deployment setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env files in both GMS-SERVER and CodeForCode directories"
echo "2. Make sure MongoDB is running and accessible"
echo "3. Start the backend server: cd GMS-SERVER && npm start"
echo "4. Serve the frontend build: cd CodeForCode && npm run preview"
echo ""
echo "For development:"
echo "- Backend: cd GMS-SERVER && npm run dev"
echo "- Frontend: cd CodeForCode && npm run dev"
echo ""
print_status "Happy coding! 🚀"