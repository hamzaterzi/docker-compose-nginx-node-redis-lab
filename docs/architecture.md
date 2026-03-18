# Architecture Notes

## Request Flow

1. Client sends a request to NGINX
2. NGINX forwards the request to app1 or app2
3. The application reads and updates the visit counter in Redis
4. The response is returned to the client

## Core Concepts

- Reverse proxy with NGINX
- Basic load balancing
- Shared state with Redis
- Stateless application instances
- Docker Compose multi-container orchestration
