# Database Schema Reference

NeuroLens uses **Supabase PostgreSQL** as its primary persistence layer. Run the SQL scripts in `backend/supabase/` in order to initialize all tables and policies.

---

## Schema Migration Order

| Step | File | Purpose |
| :--- | :--- | :--- |
| 1 | `backend/supabase/schema.sql` | Base tables, relations, and seed data |
| 2 | `backend/supabase/schema_update.sql` | Demographic columns: `educational_qualification`, `occupation`, `handedness` |
| 3 | `backend/supabase/schema_update_v2.sql` | Role column, doctor notes table, MRI prescription records |

---

## Core Tables

### `users`
Stores all registered accounts regardless of role.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key, auto-generated |
| `name` | `text` | Full display name |
| `email` | `text` | Unique login identifier |
| `password_hash` | `text` | bcrypt hashed password |
| `role` | `text` | One of: `patient`, `doctor`, `admin` |
| `age` | `integer` | Patient age in years |
| `gender` | `text` | Biological sex for normative adjustments |
| `education_years` | `integer` | Formal education duration in years |
| `handedness` | `text` | `right`, `left`, or `ambidextrous` |
| `created_at` | `timestamptz` | Account creation timestamp |

---

### `cognitive_tests`
Stores MMSE and MoCA assessment submissions.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key |
| `user_id` | `uuid` | Foreign key → `users.id` |
| `test_type` | `text` | `mmse` or `moca` |
| `raw_score` | `integer` | Total unadjusted score |
| `adjusted_score` | `float` | Demographically normalized score |
| `risk_category` | `text` | Predicted impairment tier |
| `answers` | `jsonb` | Full domain-level answers and subscores |
| `taken_at` | `timestamptz` | Test submission timestamp |

---

### `speech_analyses`
Stores vocal biomarker screening results.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key |
| `user_id` | `uuid` | Foreign key → `users.id` |
| `audio_file_path` | `text` | Relative server path to uploaded audio |
| `prediction` | `integer` | Binary classification (0 = low risk, 1 = high risk) |
| `probability` | `float` | Model confidence score |
| `stability_pct` | `float` | Acoustic stability percentage |
| `risk_level` | `text` | `Low`, `Moderate`, or `High` |
| `analyzed_at` | `timestamptz` | Inference completion timestamp |

---

### `mri_scans`
Stores neuroimaging uploads and DenseNet inference results.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key |
| `user_id` | `uuid` | Foreign key → `users.id` |
| `image_path` | `text` | Relative server path to uploaded scan |
| `predicted_class` | `text` | One of the four atrophy severity classes |
| `confidence` | `float` | Softmax probability of predicted class |
| `class_probabilities` | `jsonb` | Full softmax distribution across all classes |
| `prescribed_by` | `uuid` | Nullable FK → `users.id` of prescribing doctor |
| `uploaded_at` | `timestamptz` | Upload timestamp |

---

### `doctor_notes`
Stores signed clinical observations by doctors.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key |
| `doctor_id` | `uuid` | Foreign key → `users.id` (role = doctor) |
| `patient_id` | `uuid` | Foreign key → `users.id` (role = patient) |
| `note_text` | `text` | Free-text clinical observation |
| `created_at` | `timestamptz` | Note creation timestamp |

---

## Development Fallback

When `SUPABASE_URL` is not set in `backend/.env`, the backend automatically falls back to `backend/data/local_db.json` for read and write operations. This allows local development without requiring a live Supabase project.

