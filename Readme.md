leetcode-backend-system/
│
├── apps/                           # Main applications
│   ├── backend/                    # REST API server
│   │   ├── src/
│   │   │   ├── routes/             # API routes (e.g. /submit)
│   │   │   ├── controllers/        # Request handlers
│   │   │   ├── services/           # Business logic (e.g. push to queue)
│   │   │   ├── models/             # DB models (User, Submission)
│   │   │   ├── config/             # Env/config files
│   │   │   └── index.js            # Express app entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── worker/                     # Worker service
│   │   ├── src/
│   │   │   ├── executor/           # Code execution per language
│   │   │   ├── services/           # Queue listener, DB update
│   │   │   ├── config/
│   │   │   └── index.js
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── websocket-server/          # WebSocket server
│       ├── src/
│       │   ├── socket/             # WebSocket handlers
│       │   ├── pubsub/             # Subscribes to result updates
│       │   ├── config/
│       │   └── index.js
│       ├── Dockerfile
│       └── package.json
│
├── packages/                       # Shared code/modules
│   ├── shared/                     # Shared utilities & logic
│   │   ├── src/
│   │   │   ├── queue/              # Queue adapters (e.g. Redis)
│   │   │   ├── pubsub/             # Pub/Sub logic
│   │   │   ├── utils/              # Logger, validators, etc.
│   │   │   ├── types/              # Shared types/interfaces
│   │   │   └── config.js
│   │   └── package.json
│
├── docker-compose.yml             # Spins up everything
├── .env                           # Environment variables
├── package.json                   # Root-level scripts (optional)
└── README.md
