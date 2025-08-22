leetcode-backend/
├── queue/                  # Job queue setup (BullMQ)
│   └── index.js
│
├── workers/                # Worker servers (can have multiple for scaling/languages)
│   └── codeWorker.js
│
├── jobs/                   # Code to produce jobs (from API or test)
│   └── addJob.js
│
├── executor/               # Code execution logic (runJS, runPython, runCPP etc.)
│   ├── runCode.js
│   └── runJS.js
│
├── utils/                  # Utilities (file handling, sandboxing, etc.)
│   ├── fileHandler.js
│   └── dockerRunner.js     # Optional: Docker isolation
│
├── .env                    # Environment variables
├── package.json
└── README.md
