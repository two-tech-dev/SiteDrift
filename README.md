# SiteDriftCrowd Server

The official crowd sourcing server for **SiteDrift** (formerly FastForward). Maintained and operated by [2Tech Studio (2tech.studio)](https://2tech.studio).

This Go-based backend manages the Crowd Bypass system, enabling users to skip wait timers and ad-links by sharing bypassed destinations with the community.

## Structure
- `/src` - Core Go source code for the HTTP server, database interactions, and API handlers.
- `/dist` - Docker deployment configurations (e.g., `docker-compose.yml`).
- `/config` - Configuration files.
- `/docs` - API documentation and system guides.

## Setup & Deployment

1. Make sure you have Go 1.17+ installed.
2. Setup a MySQL/MariaDB database and configure your `.env` file based on the examples.
3. Build the server:
   ```bash
   go build -o SiteDriftCrowdServer ./src
   ```
4. Run the server:
   ```bash
   ./SiteDriftCrowdServer
   ```

Alternatively, use `docker-compose` located in the `/dist` folder for a quick containerized deployment.

## License

See the `LICENSE` file for details.
