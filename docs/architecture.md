# AtlasAI Architecture

This document describes the planned system architecture for AtlasAI. It is a forward-looking design outline for a multi-platform travel intelligence product and is intended to clarify how the project is expected to evolve.

## Status Note

The repository currently contains only the monorepo foundation and documentation scaffolding. The following architecture is a planned design, not an implemented system. Components described here are expected future modules and should not be interpreted as already built or running.

## High-Level Overview

AtlasAI is planned as a distributed platform that combines:
- a React web application for rich traveler workflows
- a React Native Expo mobile app for on-the-go access
- a Node.js Express API for business logic and secure backend operations
- a Python FastAPI AI service for recommendation and planning intelligence
- a PostgreSQL database managed through Supabase for application data
- OpenStreetMap for geographic context and map-based interactions

Together, these components support a travel planning ecosystem where users can browse destinations, create personalized plans, review itinerary details, and receive intelligent trip recommendations.

## Planned Components

### 1. React Web App

The React web app is planned as the primary browser-based experience for:
- trip dashboards
- destination discovery
- itinerary management
- planning workflows
- account and profile settings

This frontend will likely communicate with the backend API over HTTPS for user data, trip operations, and recommendations. It may also call the AI service directly for specialized trip-generation requests, depending on the final architecture design.

### 2. React Native Expo Mobile App

The React Native mobile app is planned as the companion experience for travelers using mobile devices. It will likely support:
- quick trip access
- itinerary viewing
- mobile-friendly planning tasks
- location-aware travel workflows
- push notifications or reminder-style experiences

Expo is chosen as the planned mobile stack for streamlined cross-platform development and easier iteration on iOS and Android targets.

### 3. Node.js Express API

The Node.js backend is planned as the main application service layer. Responsibilities will include:
- user authentication and authorization
- trip and itinerary CRUD operations
- business rules and validation
- external API integrations
- orchestration between client apps and the AI service
- access to the Supabase PostgreSQL database

This API acts as the central application backend and will likely provide the main RESTful interfaces consumed by the web and mobile clients.

### 4. Python FastAPI AI Service

The Python AI service is planned to provide intelligent travel support through a dedicated microservice. It could handle:
- recommendation generation
- travel preference analysis
- itinerary optimization suggestions
- natural-language trip assistance
- ranking and personalization logic

FastAPI is a suitable planned choice because of its performance, modern Python typing, and straightforward API structure for AI workloads.

### 5. Supabase PostgreSQL Database

Supabase is planned as the managed PostgreSQL layer for AtlasAI. It will likely provide:
- relational data storage for users, trips, and itinerary records
- authentication support for application users
- row-level security patterns for protected access
- database APIs or SQL access for backend services
- storage or metadata support for plan-related files or attachments

The Node.js API is the primary planned component interacting with the database, while the AI service may access selected data or derived analytics depending on the implementation model.

### 6. OpenStreetMap

OpenStreetMap is planned as a geographic and map data source for:
- map rendering
- destination exploration
- location context
- route or place reference data
- trip planning around points of interest

It supports the platform’s travel intelligence features by providing geospatial context for locations, routes, and destination discovery.

## Planned Communication Flow

### Client to Backend

The React web app and React Native mobile app are planned to communicate with the Node.js Express API using HTTP requests.

Typical flows:
- user login and session creation
- trip data retrieval
- itinerary saves and updates
- profile management
- backend-driven business logic and validation

### Backend to Database

The Express API is planned to use Supabase PostgreSQL as its persistence layer for structured application records.

Typical data includes:
- user profiles
- destinations and saved location metadata
- itinerary and travel plan records
- trip preferences and associated settings

### Backend to AI Service

The backend is planned to call the Python FastAPI AI service when an AI-assisted workflow is required.

Examples include:
- generating travel recommendations
- ranking destinations based on user preferences
- suggesting itinerary improvements
- summarizing or personalizing trip plans

This keeps the AI logic modular and allows the backend to control access, validation, and business rules around AI outputs.

### AI Service to Other Components

The AI service is planned to receive structured requests from the Node.js API and return computed recommendations, scoring, or generated suggestions. It may also interact with selected data sources depending on implementation.

### Client to Map / Location Data

The frontends are planned to use OpenStreetMap data or map-related integrations for location display and geographic exploration. This may be done through map libraries, tile services, or geolocation APIs, depending on the final app design.

## Component Interaction Diagram (Conceptual)

```text
React Web App        React Native Expo App
       \                     /
        \                   /
         \----> Node.js Express API <----\
                  |                     \
                  |                     \--> Python FastAPI AI Service
                  |
                  v
             Supabase PostgreSQL
                  |
                  v
           OpenStreetMap / geodata services
```

This diagram is conceptual and represents the planned software architecture rather than current runtime status.

## Planned Data Flow Example

A typical journey in the planned system could be:

1. User opens the web or mobile app.
2. Client app sends a request to the Express API for trip or profile data.
3. The API queries Supabase PostgreSQL for persisted application data.
4. If the user requests AI-based planning, the API sends a request to the FastAPI AI service.
5. The AI service processes preference and trip context data and returns recommendations.
6. The API validates and returns the result to the frontend.
7. The frontend renders the plan or itinerary with location context from map data and OpenStreetMap-backed services.

## Responsibilities by Layer

### Presentation Layer
- React web app
- React Native Expo app

### Application Layer
- Node.js Express API
- Python FastAPI AI service

### Data Layer
- Supabase PostgreSQL
- OpenStreetMap geospatial data

## Planned Scalability Considerations

The architecture is intended to support a modular future design where:
- frontend experiences remain independent from business rules
- AI capabilities are isolated in a dedicated service
- the central API coordinates application workflows and external integrations
- data persistence remains structured and queryable through Supabase
- geospatial content is handled with map data providers rather than embedded into the core app logic

## Important Distinction: Planned vs Implemented

The components described above are planned and expected future software modules. They are not yet implemented as production-ready services in this repository.

Currently implemented in the repo:
- monorepo folder scaffolding
- documentation placeholders
- root README and architecture notes
- environment template files for future services

Not yet implemented:
- React web application code
- React Native mobile application code
- Node.js Express server
- Python FastAPI service
- database schema and Supabase configuration
- OpenStreetMap integration layer
- user auth flows
- AI recommendation engine

## Conclusion

AtlasAI’s planned architecture centers on a modular, multi-platform service model that separates user experience, backend workflows, AI intelligence, and persistent data management. This design supports a scalable travel platform while keeping responsibilities clear across the web app, mobile app, API, AI service, and data sources.
