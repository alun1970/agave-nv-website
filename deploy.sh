#!/bin/bash

# Azure Static Web Apps Deployment Script
# This script helps deploy the coming soon website to Azure

set -e

echo "🚀 Agave NV - Coming Soon Website Deployment"
echo "============================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if user is logged in to Azure
if ! az account show &> /dev/null; then
    echo "🔐 Please log in to Azure:"
    az login
fi

echo "📁 Current directory: $(pwd)"
echo "📄 Files to deploy:"
ls -la

# Prompt for Static Web App name
read -p "Enter your Azure Static Web App name: " APP_NAME

if [ -z "$APP_NAME" ]; then
    echo "❌ App name cannot be empty"
    exit 1
fi

# Prompt for resource group
read -p "Enter your Azure resource group name: " RESOURCE_GROUP

if [ -z "$RESOURCE_GROUP" ]; then
    echo "❌ Resource group cannot be empty"
    exit 1
fi

echo "🔍 Checking if Static Web App exists..."

# Check if the Static Web App exists
if az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    echo "✅ Static Web App '$APP_NAME' found"
else
    echo "❌ Static Web App '$APP_NAME' not found in resource group '$RESOURCE_GROUP'"
    echo "Please create it first in the Azure Portal or using:"
    echo "az staticwebapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --source . --location 'Central US' --branch main --app-location '/' --output-location ''"
    exit 1
fi

echo "🚀 Deploying to Azure Static Web Apps..."

# Deploy the static site
az staticwebapp deploy \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --source . \
    --app-location "/" \
    --output-location ""

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://$APP_NAME.azurestaticapps.net"
echo ""
echo "📝 Next steps:"
echo "1. Visit your site to verify it's working"
echo "2. Set up custom domain if needed"
echo "3. Configure custom headers or redirects in staticwebapp.config.json"
