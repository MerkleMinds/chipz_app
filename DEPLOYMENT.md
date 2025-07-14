# Chipz App Deployment Guide

This document outlines the deployment workflow for the Chipz application using GitHub Actions and AWS ECS.

## Deployment Branches

The repository has two dedicated deployment branches:

1. **`production/deploy`**: For production environment deployments
2. **`development/deploy`**: For development/staging environment deployments

## Deployment Process

### Automatic Deployments

The deployment process is automated using GitHub Actions workflows:

1. When code is pushed to the `production/deploy` or `development/deploy` branch, GitHub Actions will automatically:
   - Build a Docker image using the appropriate Dockerfile
   - Push the image to Amazon ECR
   - Update the ECS task definition with the new image
   - Deploy the updated task definition to the ECS service
   - Send a Slack notification about the deployment status

### Manual Deployments

You can also trigger deployments manually:

1. Go to the GitHub repository
2. Navigate to the "Actions" tab
3. Select either "Deploy to Amazon ECS - Production" or "Deploy to Amazon ECS - Development"
4. Click "Run workflow" and select the branch to deploy from

## Setup Requirements

Before using the deployment workflows, ensure the following are set up:

1. **AWS Resources**:
   - ECR repository named `chipz-app`
   - ECS cluster named `chipz-cluster`
   - ECS services named `chipz-app-production` and `chipz-app-development`
   - Task definitions based on the templates in `.aws/` directory

2. **GitHub Secrets**:
   - `AWS_ACCESS_KEY_ID`: AWS access key with permissions for ECR and ECS
   - `AWS_SECRET_ACCESS_KEY`: Corresponding AWS secret key
   - `AWS_REGION`: AWS region where resources are deployed
   - `SLACK_WEBHOOK`: Webhook URL for Slack notifications (optional)

## Docker Configuration

### Production Environment

- **Dockerfile**: Standard Dockerfile optimized for production
- **Docker Compose**: `docker-compose.production.yml`

### Development Environment

- **Dockerfile**: `Dockerfile.dev` with development-specific configurations
- **Docker Compose**: `docker-compose.development.yml`

## Local Testing

To test the Docker configurations locally:

### Production:

```bash
docker-compose -f docker-compose.production.yml up
```

### Development:

```bash
docker-compose -f docker-compose.development.yml up
```