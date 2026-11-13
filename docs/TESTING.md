# Testing Guide

This document describes manual and automated testing strategies for the NeuroLens platform.

---

## 1. Backend API Testing (Manual via Postman or curl)

### Step 1 – Start the backend
```bash
cd backend
node server.js
```
Confirm the server prints the NeuroLens startup banner and listens on port `5000`.

### Step 2 – Register a test patient
```bash
curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@neurolens.local\",\"password\":\"Test1234!\",\"role\":\"patient\",\"age\":65,\"gender\":\"male\",\"educationYears\":14,\"handedness\":\"right\"}"
```
Expected: `201` with a `token` field in the response body.

### Step 3 – Login and capture the token
```bash
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@neurolens.local\",\"password\":\"Test1234!\"}"
```
Save the returned `token` value as `$TOKEN` for subsequent requests.

### Step 4 – Submit a sample MMSE result
```bash
curl -s -X POST http://localhost:5000/api/tests/mmse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"totalScore\":27,\"answers\":{\"orientation\":10,\"registration\":3,\"attention\":4,\"recall\":2,\"language\":8},\"demographics\":{\"age\":65,\"educationYears\":14}}"
```
Expected: `200` with an adjusted score and impairment category in the response.

---

## 2. Frontend Smoke Testing (Manual)

After running `npm run dev` in `frontend/`:

| Screen | Action | Expected Result |
| :--- | :--- | :--- |
| Landing Page `/` | Load in browser | Hero section and feature cards render correctly |
| Signup `/signup` | Fill form and submit | Redirect to `/dashboard` with user name visible in navbar |
| Login `/login` | Enter credentials | Redirect to `/dashboard`, token persisted in `localStorage` |
| MMSE Test `/tests/mmse` | Complete all questions | Submit button active, POST fires to `/api/tests/mmse` |
| MoCA Test `/tests/moca` | Complete all questions | Score calculated and result page displayed |
| Speech Test `/tests/speech` | Grant mic permission, record | Audio blob sent to `/api/speech/upload`, risk label shown |
| MRI Upload `/mri-upload` | Upload a scan image | Inference result card displays predicted class and confidence |
| Reports `/reports` | Load page | Charts render with latest multi-modal scores |
| Doctor Portal `/doctor-portal` | Login as doctor role | Patient roster table visible, notes editor available |

---

## 3. ML Model Sanity Tests

### MRI Inference Sanity Check
```bash
cd backend
python ml_model/inference_mri.py --image ../test_mri.jpg
```
Expected: JSON output with `predicted_class` and `confidence` fields. No Python exceptions.

### Cognitive Risk Inference Check
```bash
cd backend
python ml_model/inference_cognitive.py --age 70 --education 12 --sex M --mmse 24 --moca 22
```
Expected: JSON output with `risk_category` field (e.g., `MildCognitiveImpairment`).

### Speech Inference Check
```bash
cd backend
python Speech_model/inference.py --audio path/to/sample.wav
```
Expected: JSON with `prediction`, `probability`, `stability_pct`, and `risk_level` fields.

---

## 4. Common Test Failures and Fixes

| Failure | Likely Cause | Fix |
| :--- | :--- | :--- |
| `401 Unauthorized` on protected routes | Expired or missing token | Re-login and use fresh token |
| `500` on speech upload | Missing `.pkl` model files | Copy `scaler.pkl`, `pca.pkl`, `dementia_model.pkl` to `backend/Speech_model/` |
| `ModuleNotFoundError` in Python scripts | Missing pip packages | Run `pip install -r requirements.txt` |
| MRI inference returns `ModerateDemented` on normal image | Model not fine-tuned on this scan | Expected — test with `test_mri.jpg` in repo root for a valid check |

