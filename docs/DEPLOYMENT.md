# NeuroLens Deployment & Operations Guide

This guide provides operational instructions for deploying and maintaining the NeuroLens application stack across development, staging, and production environments.

---

## 1. Environment Architecture

NeuroLens consists of three integrated layers:
1. **Frontend**: Vite Single Page Application (static assets served via Nginx, Vercel, or Netlify).
2. **Backend**: Node.js Express service orchestrating API endpoints and invoking local Python inference processes.
3. **Database & Storage**: Supabase managed PostgreSQL with Row Level Security (RLS) and object storage for scan assets.

---

## 2. Production Environment Checklist

Before deploying the backend API to production, ensure the following environment variables are securely provisioned:

| Variable | Description | Recommended Setting |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime mode | `production` |
| `PORT` | Web server bind port | `5000` (or host assigned) |
| `JWT_SECRET` | Secret key for JWT signing | 64+ char cryptographically secure random string |
| `JWT_EXPIRES_IN` | Session token lifetime | `7d` |
| `SUPABASE_URL` | Cloud project endpoint | `https://<project-ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Administrative service key | Stored in secret manager, never exposed |
| `CLIENT_URL` | Allowed origin for CORS | Production frontend URL (e.g., `https://neurolens.app`) |
| `MAX_MRI_FILE_SIZE` | MRI upload upper limit in MB | `50` |
| `MAX_AUDIO_FILE_SIZE` | Speech audio upload limit in MB | `20` |

---

## 3. Python Environment Isolation

The backend invokes Python inference scripts via Node child processes (`child_process.spawn`). Ensure the host machine has an isolated Python runtime with all required dependencies:

```bash
# 1. Create a dedicated virtual environment
python -m venv .venv

# 2. Activate environment
# On Linux/macOS:
source .venv/bin/activate
# On Windows PowerShell:
.\.venv\Scripts\Activate.ps1

# 3. Install PyTorch, transformers, and scientific packages
pip install --upgrade pip
pip install -r requirements.txt
```

If using a custom virtual environment path, specify `PYTHON_PATH` in `backend/.env`:
```env
PYTHON_PATH=/opt/neurolens/.venv/bin/python
```

---

## 4. Process Management (PM2)

For production Node.js deployment, use PM2 to manage the backend lifecycle:

```bash
cd backend
pm2 start server.js --name "neurolens-api" -i max
pm2 save
pm2 startup
```

---

## 5. Frontend Production Build

Compile optimized static assets:

```bash
cd frontend
npm ci
npm run build
```

The resulting `frontend/dist/` bundle can be served directly via Nginx, Cloudflare Pages, AWS S3 + CloudFront, or Vercel.

