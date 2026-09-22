# IA-CRC

**Indonesia–Australia Collaborative Research in Construction**

Official website for the IA-CRC research forum — a place for Indonesian and Australian academics to collaborate on construction industry challenges.

**Empowering the Future of Construction**

## Local development

```bash
npm install
npm run dev
```

The app listens on port 8080. Copy `.env.example` to `.env.local` if you need database or auth overrides.

Without `DATABASE_URL`, the app uses embedded PGLite (in-memory Postgres) so publications and visits still work locally.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (runs DB migrations) |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests for build scripts |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Apply `migrations/*.sql` to `DATABASE_URL` |

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon/Postgres connection string |
| `VITE_PUBLIC_HOSTNAME` | Host for absolute OG image URLs |
| `VITE_SHOW_AUTH_UI` | Show Sign in when `true` (hidden by default) |
| `VITE_AUTH_ENABLED` | Set `false` to disable Better Auth |
| `PUBLICATIONS_ADMIN_TOKEN` | When set, new papers need approval via API |

## Contact

Secretariat: Construction and Infrastructure Management Research Group, Institut Teknologi Bandung  
CIBE Building, 6th Floor, Jl. Ganesha No. 10, Bandung, Indonesia  
[abduh@itb.ac.id](mailto:abduh@itb.ac.id)
