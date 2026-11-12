# NeuroLens Frontend Client

The frontend interface for **NeuroLens** — a multi-modal cognitive screening and monitoring application built with React, Vite, and Tailwind CSS.

## Overview

The client application provides dedicated interfaces for both patients and healthcare providers:
- **Patient Dashboard & Screening**: Interactive digitized cognitive assessments (MMSE, MoCA, Clock Drawing, Trail Making Test), speech biomarker recording, and MRI upload interface.
- **Doctor Portal**: Clinical review dashboard with patient histories, MRI prescriptions, and clinical notes management.
- **Comprehensive Reports**: Visual analytics displaying cognitive risk, normative percentiles, and multi-modal risk projections.

## Project Structure

```
frontend/
├── public/                 # Static assets and assessment figures
├── src/
│   ├── assets/             # Brand logos and vector graphics
│   ├── components/         # Reusable UI components
│   │   ├── ClinicalVisuals.jsx    # Visual risk gauges and radars
│   │   ├── DashboardCard.jsx      # Stat and summary cards
│   │   ├── DoctorCard.jsx         # Doctor listing & booking
│   │   ├── Navbar.jsx             # Top navigation bar
│   │   ├── ProgressBar.jsx        # Test completion meter
│   │   ├── ProtectedRoute.jsx     # Role-based route guard
│   │   ├── QuestionCard.jsx       # Standard questionnaire card
│   │   ├── Sidebar.jsx            # App sidebar navigation
│   │   └── TestQuestionCard.jsx   # Clinical test interactive card
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication and user session state
│   ├── data/
│   │   └── questions.js           # MMSE and MoCA question banks
│   ├── pages/                     # Routed views (Patient & Doctor)
│   ├── services/
│   │   └── api.js                 # Axios API client with interceptors
│   ├── styles/
│   │   └── global.css             # Theme and global style definitions
│   ├── App.jsx                    # Route switchboard and app layout
│   └── main.jsx                   # React root entrypoint
├── index.html              # HTML shell
├── package.json            # Node dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Available Scripts

In the `frontend/` directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode on [http://localhost:5173](http://localhost:5173) with HMR |
| `npm run build` | Bundles the production build into the `dist/` folder |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Runs ESLint to check for code quality and style violations |

## Routing Architecture

- `/` — Landing page with project overview and feature introduction
- `/login` & `/signup` — Authentication entry points with role selection
- `/dashboard` — Patient overview showing recent assessments and health trends
- `/tests/clinical` — Assessment selector for standardized tests
- `/tests/mmse` & `/tests/moca` — Interactive cognitive test engines
- `/tests/clock` — Canvas-based Clock Drawing Test
- `/tests/trail` — Interactive Trail Making Test (TMT-A & TMT-B)
- `/tests/speech` — Audio recording & speech biomarker screening
- `/mri-upload` — Neuroimaging scan uploader with real-time inference
- `/reports` — Longitudinal reports and risk breakdown
- `/doctors` — Directory of clinical specialists
- `/doctor-portal` — Secure portal for medical practitioners (patient records, prescription management)
- `/profile/edit` — Patient demographic and clinical baseline editor

## Environment Configuration

By default, the client talks to `http://localhost:5000/api`. To customize:

Create `.env` inside `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
