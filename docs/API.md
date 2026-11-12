# NeuroLens REST API Reference

The NeuroLens backend provides RESTful JSON endpoints for authentication, cognitive test logging, speech and MRI analysis, and clinical workflows.

**Base URL**: `http://localhost:5000/api`

---

## Authentication

All protected routes require an HTTP `Authorization` header containing a valid Bearer token:
```http
Authorization: Bearer <jwt_token>
```

### 1. Register User
- **Endpoint**: `POST /auth/signup`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123",
    "role": "patient",
    "age": 68,
    "gender": "female",
    "educationYears": 16,
    "handedness": "right"
  }
  ```
- **Response**: `201 Created` with JWT token and user profile object.

### 2. Login User
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response**: `200 OK` with JWT token and user profile object.

---

## Cognitive Assessments (`/tests`)

### 1. Submit MMSE Assessment
- **Endpoint**: `POST /tests/mmse`
- **Auth**: Required (`patient`)
- **Body**:
  ```json
  {
    "totalScore": 27,
    "answers": { "orientation": 10, "registration": 3, "attention": 4, "recall": 2, "language": 8 },
    "demographics": { "age": 68, "educationYears": 16 }
  }
  ```
- **Response**: `200 OK` with raw score, demographically adjusted score, and impairment category.

### 2. Submit MoCA Assessment
- **Endpoint**: `POST /tests/moca`
- **Auth**: Required (`patient`)
- **Body**:
  ```json
  {
    "totalScore": 25,
    "subscores": { "visuospatial": 4, "naming": 3, "attention": 5, "language": 2, "abstraction": 2, "delayedRecall": 4, "orientation": 5 }
  }
  ```
- **Response**: `200 OK` with adjusted normative score and risk tier.

---

## Speech Analysis (`/speech`)

### 1. Upload & Analyze Speech Sample
- **Endpoint**: `POST /speech/upload`
- **Auth**: Required (`patient`)
- **Content-Type**: `multipart/form-data`
- **Payload**:
  - `audio`: Audio recording file (`.wav` or `.mp3`, max 20MB)
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "prediction": 0,
      "probability": 0.18,
      "stability_pct": 82.0,
      "risk_level": "Low",
      "speech_id": "uuid-here"
    }
  }
  ```

---

## MRI Scan Analysis (`/mri`)

### 1. Upload & Analyze MRI Scan
- **Endpoint**: `POST /mri/upload`
- **Auth**: Required
- **Content-Type**: `multipart/form-data`
- **Payload**:
  - `image`: Structural MRI axial image (`.jpg`, `.png`, max 50MB)
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "scan_id": "uuid-here",
      "predicted_class": "VeryMildDemented",
      "confidence": 0.91,
      "class_probabilities": {
        "NonDemented": 0.05,
        "VeryMildDemented": 0.91,
        "MildDemented": 0.03,
        "ModerateDemented": 0.01
      }
    }
  }
  ```

---

## Doctor Portal (`/doctor-portal`)

- `GET /doctor-portal/patients`: Retrieve assigned patient roster with status and latest test flags.
- `GET /doctor-portal/patient/:id`: Retrieve full multi-modal longitudinal history for a specific patient.
- `POST /doctor-portal/notes`: Append signed clinical evaluation note.
- `POST /doctor-portal/prescribe-mri`: Create official doctor prescription requesting an MRI scan.
