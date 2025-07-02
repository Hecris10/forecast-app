## JStack

Ship high-performance Next.js apps for extremely cheap

## Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Bun (recommended) or npm

### Local Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd forecast-app
   bun install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Start the database:**
   ```bash
   bun run docker:up
   ```

4. **Setup the database:**
   ```bash
   bun run setup:dev
   ```

5. **Start development server:**
   ```bash
   bun run dev
   ```

### Available Commands

- `bun run docker:up` - Start PostgreSQL container
- `bun run docker:down` - Stop containers
- `bun run docker:restart` - Restart containers
- `bun run docker:logs` - View container logs
- `bun run docker:clean` - Remove containers and volumes
- `bun run setup:dev` - Full development setup
- `bun run reset:dev` - Reset everything and start fresh

### Database Connection

- **Host:** localhost
- **Port:** 5432
- **Database:** forecast_app_dev
- **Username:** postgres
- **Password:** postgres
- **Connection String:** `postgresql://postgres:postgres@localhost:5432/forecast_app_dev`

### Troubleshooting

**Database won't start:**
```bash
bun run docker:clean
bun run setup:dev
```

**Prisma connection issues:**
```bash
bun run db:generate
bun run db:migrate:dev
```

**Reset everything:**
```bash
bun run reset:dev
```
