# Changelog

All notable changes to NeuroLens are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Longitudinal trend graphs on the patient dashboard
- PDF export for clinical reports
- Push notification support for doctor review alerts
- Multi-language UI localization (Hindi, Marathi)

---

## [1.0.0] – 2026-04-20

### Added
- Multi-modal cognitive screening platform under the NeuroLens brand
- Interactive digitized MMSE and MoCA cognitive assessments with demographically adjusted scoring
- Clock Drawing Test with HTML5 canvas input
- Trail Making Test (TMT-A and TMT-B) with timed interactive interface
- Speech biomarker screening using Wav2Vec2-based feature extraction and dementia classification
- Structural MRI upload and deep-learning inference via fine-tuned DenseNet-121 model
- Doctor portal with patient roster, clinical notes, and MRI prescription workflows
- JWT-based authentication with patient and doctor role separation
- Supabase PostgreSQL persistence with local JSON fallback for development
- Comprehensive risk reports combining all modality scores

### Changed
- Rebranded the project from CogniFusion to NeuroLens
- Migrated speech model pipeline from MFCC features to Wav2Vec2 contextual embeddings
- Replaced flat user model with role-aware schema supporting patients, doctors, and admins

### Fixed
- CORS policy now correctly reflects environment-specific allowed origins
- Python path resolution made cross-platform for Windows and Linux deployments

---

## [0.1.0] – 2026-03-10

### Added
- Initial project scaffolding with Express backend and React/Vite frontend
- Basic user authentication flow (signup, login, JWT issuance)
- Placeholder routes for cognitive tests, speech upload, and MRI upload
- First Supabase schema with users and cognitive_tests tables

