# Forecast App

> ⚠️ **WARNING:** All environment variables are stored in the `.env.local` file. **Never use this file or its values in production!** It is intended for local development only. Always configure production secrets and environment variables securely and separately.

A modern weather forecast application built with Next.js, featuring real-time weather data, address geocoding, and search history.

## Features

- 🌤️ Real-time weather forecasts from National Weather Service API
- 📍 Address geocoding with Census Bureau API
- 📱 Responsive design with dark/light theme support
- 🔍 Search history with user authentication
- 🎨 Modern UI with Framer Motion animations
- 🗄️ PostgreSQL database with Prisma ORM

## Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- Bun (recommended) or npm

### Local Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/Hecris10/forecast-app.git
   cd forecast-app
   bun install
   ```

2. **Create environment file:**
   ```bash
   cp .env.local .env
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

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Backend:** Hono, JStack
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Better Auth
- **State Management:** TanStack Query
- **UI Components:** Radix UI, shadcn/ui
