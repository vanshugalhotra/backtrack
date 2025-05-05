# 🚀 BackTrack - Reverse Engineering CLI Challenge Platform

> Interactive CLI-based decoding simulator for Cosmos-themed event.

## 🧩 Problem Flow

1. User selects a problem.
2. CLI simulates decoding via backend `.exe` execution.
3. Output helps the user reach a final code solution.
4. Code is written on HackerEarth (external platform).

## 📦 Monorepo Structure

```plaintext
backtrack/
├── frontend/   # Next.js CLI UI + problem list
├── backend/    # Express.js APIs + .exe execution
├── shared/     # Shared constants, types (optional)
└── .github/    # GitHub workflows for CI/CD
```