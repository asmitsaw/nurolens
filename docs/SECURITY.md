# Security Notes

## Credential Handling

- Never commit real credentials to version control.
- Use `backend/.env.example` as a template. Copy it to `.env` and fill in your own keys.
- The `backend/.env` file is listed in `.gitignore` and must never be staged or pushed.

## Supabase Keys

- `SUPABASE_ANON_KEY` is a client-side safe key but should still be kept out of source code where possible.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses all Row Level Security policies. It is strictly server-side only.

## JWT

- `JWT_SECRET` must be a long, random, cryptographically secure string (minimum 64 characters).
- Rotate this key if you suspect a breach. All existing sessions will be immediately invalidated on rotation.

## File Uploads

- Uploaded MRI and audio files are stored in `backend/uploads/` which is excluded from Git via `.gitignore`.
- In production, use a dedicated object storage bucket (e.g., Supabase Storage) rather than local disk.

## Rate Limiting

The backend applies express rate limiting globally. The default configuration allows 100 requests per 15-minute window per IP.
To adjust, update the `rateLimit` options inside `backend/server.js`.

## Reporting a Vulnerability

Please do not open a public GitHub issue for security vulnerabilities.
Contact the maintainer directly via email before disclosing any finding publicly.
