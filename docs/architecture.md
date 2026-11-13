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
- MongoDB Atlas as the managed cloud database for application data, accessed with Mongoose from the Node.js API
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

This frontend will likely communicate with the backend API over HTTPS for user data, trip operations, and recommendations. It will never connect directly to the database: the browser bundle has no MongoDB driver, no `MONGODB_URI`, and no Atlas credentials. Any AI-assisted workflow is routed through the backend API so trip permissions can be enforced there.

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
- the only component with database credentials and access to the MongoDB Atlas cluster, through Mongoose models
- authorization for user-owned data and shared trip permissions

This API acts as the central application backend and will likely provide the main RESTful interfaces consumed by the web and mobile clients.

### 4. Python FastAPI AI Service

The Python AI service is planned to provide intelligent travel support through a dedicated microservice. It could handle:
- recommendation generation
- travel preference analysis
- itinerary optimization suggestions
- natural-language trip assistance
- ranking and personalization logic

FastAPI is a suitable planned choice because of its performance, modern Python typing, and straightforward API structure for AI workloads.

### 5. MongoDB Atlas Database

MongoDB Atlas is the planned managed cloud database for AtlasAI, used through Mongoose as the ODM inside the Node.js Express API. It will provide:
- document storage for users, destinations, trips, itineraries, itinerary days, activities, saved places, favourites, budgets, and trip collaborators
- a managed, replicated cluster with backups, monitoring, and network access controls
- indexes for frequent lookups such as email, trip ownership, and trip-scoped itinerary reads
- a single connection string supplied to the API through the `MONGODB_URI` environment variable

The Node.js API is the **only** planned component that connects to Atlas. It resolves authorization (trip ownership and collaborator roles) before reading or writing, and no frontend or the AI service holds database credentials. Collection structures, embedding rules, validation, and indexes are defined in [database-design.md](database-design.md).

Authentication and authorization are planned to be enforced in the Express API layer. MongoDB does not provide row-level security policies, so the API is the single enforcement point for user-owned data and shared trip access.

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

The React web app and React Native mobile app are planned to communicate with the Node.js Express API using HTTP requests. They never connect directly to MongoDB; all database access is mediated by the API.

Typical flows:
- user login and session creation
- trip data retrieval
- itinerary saves and updates
- profile management
- backend-driven business logic and validation

### Backend to Database

The Express API is planned to use MongoDB Atlas as its persistence layer, connecting through Mongoose with the `MONGODB_URI` environment variable read from the server environment (never committed to source control).

Typical data includes:
- user profiles and preferences
- destinations and saved place metadata
- trips, itineraries, itinerary days, and ordered activities
- budgets, favourites, and trip collaborator permissions

### Backend to AI Service

The backend is planned to call the Python FastAPI AI service when an AI-assisted workflow is required.

Examples include:
- generating travel recommendations
- ranking destinations based on user preferences
- suggesting itinerary improvements
- summarizing or personalizing trip plans

This keeps the AI logic modular and allows the backend to control access, validation, and business rules around AI outputs.

### AI Service to Other Components

The AI service is planned to receive structured requests from the Node.js API and return computed recommendations, scoring, or generated suggestions. It is planned to access AtlasAI data **through the backend API** rather than connecting to MongoDB directly, so the API remains the only enforcement point for trip permissions and so the AI service holds no database credentials. Direct database access would be added only for a specific, separately justified workload (for example a read-only analytics or vector collection) with its own least-privilege credentials.

### Client to Map / Location Data

The frontends are planned to use OpenStreetMap data or map-related integrations for location display and geographic exploration. This may be done through map libraries, tile services, or geolocation APIs, depending on the final app design.

## Component Interaction Diagram (Conceptual)

```text
React Web App        React Native Expo App
       \                     /
        \                   /
         \----> Node.js Express API <----\
                       | \                 \
                       |  \                 \--> Python FastAPI AI Service
                       |   \                     (API-mediated data access only)
                       v    \
              MongoDB Atlas     \--> OpenStreetMap / geodata services
              (via Mongoose)
```

This diagram is conceptual and represents the planned software architecture rather than current runtime status.

## Planned Data Flow Example

A typical journey in the planned system could be:

1. User opens the web or mobile app.
2. Client app sends a request to the Express API for trip or profile data.
3. The API checks the caller's identity and trip permissions, then queries MongoDB Atlas through Mongoose for persisted application data.
4. If the user requests AI-based planning, the API sends a request to the FastAPI AI service.
5. The AI service processes the preference and trip context it received and returns recommendations; it does not query MongoDB itself.
6. The API validates and returns the result to the frontend.
7. The frontend renders the plan or itinerary with location context from map data and OpenStreetMap-backed services.

## Responsibilities by Layer

### Presentation Layer
- React web app
- React Native Expo app

### Application Layer
- Node.js Express API (also the request path to the database)
- Python FastAPI AI service

### Data Layer
- MongoDB Atlas (accessed only by the Express API)
- OpenStreetMap geospatial data

## Planned Scalability Considerations

The architecture is intended to support a modular future design where:
- frontend experiences remain independent from business rules
- AI capabilities are isolated in a dedicated service
- the central API coordinates application workflows and external integrations
- data persistence remains in a managed MongoDB Atlas cluster that only the API talks to, with an index strategy for frequent queries
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
- MongoDB Atlas cluster configuration and Mongoose models
- OpenStreetMap integration layer
- user auth flows
- AI recommendation engine

## Conclusion

AtlasAI’s planned architecture centers on a modular, multi-platform service model that separates user experience, backend workflows, AI intelligence, and persistent data management. MongoDB Atlas stores the application data, the Express API is its only consumer, and the web app, mobile app, and AI service reach that data exclusively through the API — keeping responsibilities clear across the web app, mobile app, API, AI service, and data sources.
