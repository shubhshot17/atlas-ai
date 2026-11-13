# Environment Variables Guide

This document explains how environment variables are expected to be used across the AtlasAI monorepo as the project grows.

## Purpose

Environment variables keep local configuration, credentials, and deployment-specific settings out of source control. Each service or app will read only the variables it needs, while placeholders remain documented in `.env.example` files.

## Variable usage by area

### Web app
- `VITE_API_BASE_URL`: base URL for the Node.js backend API
- `VITE_AI_SERVICE_URL`: base URL for the Python AI service
- `VITE_AUTH_CLIENT_ID`: frontend authentication client identifier
- `VITE_MAPS_API_BASE_URL`: map provider endpoints used in the browser app

### Node.js API
- `MONGODB_URI`: MongoDB Atlas connection string (the only variable needed for the database; includes the cluster host, database user, and database name)
- `REDIS_URL`: cache/session store connection string
- `JWT_SECRET`: secret used to sign API tokens
- `AI_SERVICE_URL`: endpoint for the AI service
- `TRAVEL_PROVIDER_API_KEY`: API key for external travel integrations

### Python AI service
- `MODEL_PROVIDER` and `MODEL_NAME`: determine the active model or provider
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`: provider credentials for inference
- `REDIS_URL`: optional caching hook for AI workflows
- The AI service is not expected to hold database credentials; it reads AtlasAI data through the backend API.
- `VECTOR_DB_URL`: endpoint for similarity or recommendation indexes if used

### Mobile app
- `EXPO_PUBLIC_API_BASE_URL`: backend base URL for the app
- `EXPO_PUBLIC_AI_SERVICE_URL`: AI service endpoint used by mobile flows
- `EXPO_PUBLIC_AUTH_CLIENT_ID`: client identifier for the mobile auth flow
- `EXPO_PUBLIC_MAPS_API_KEY`: maps or location provider key for travel features

## Database credentials

- MongoDB Atlas is the primary database. Only the Node.js API reads `MONGODB_URI`.
- The React web app and React Native app must never receive a MongoDB connection string or Atlas credentials; they connect to the backend API only.
- The Python AI service accesses data through the backend API and does not need `MONGODB_URI`.
- Create a dedicated Atlas database user for the API with least privilege, and restrict network access to known IPs.

## Security guidelines

- Never commit real credentials, tokens, or private keys.
- Use local `.env` files only for development.
- Keep all environment values in secure deployment secret stores in non-local environments.
- Replace placeholders with service-specific values before running application code.

## Naming convention

The repository uses clear, service-specific names:
- Web app variables use the `VITE_` prefix.
- Expo mobile variables use the `EXPO_PUBLIC_` prefix.
- Node.js variables are plain uppercase names such as `PORT`, `MONGODB_URI`, and `JWT_SECRET`.
- Python variables are also uppercase names for service configuration and model settings.

The files in this repository are examples only and do not contain actual production secrets.
