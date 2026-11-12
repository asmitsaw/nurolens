# Frequently Asked Questions

Answers to common setup, usage, and technical questions about NeuroLens.

---

## General

**Q: What is NeuroLens?**
NeuroLens is a multi-modal cognitive screening platform that combines interactive clinical assessments, speech biomarker analysis, and AI-powered neuroimaging review into a single web application for patients and healthcare professionals.

**Q: Is NeuroLens a certified medical device?**
No. NeuroLens is a screening and monitoring tool intended to assist clinicians — it is not a replacement for a formal clinical diagnosis. All results must be reviewed and validated by a qualified healthcare professional.

**Q: Who are the intended users?**
NeuroLens has two primary user roles:
- **Patients**: Complete cognitive assessments, record speech samples, and upload MRI scans for preliminary screening.
- **Doctors / Clinicians**: Review patient histories, write clinical notes, and issue MRI prescriptions through the Doctor Portal.

---

## Setup

**Q: The backend fails to start with `Cannot find module` errors.**
Run `npm install` inside the `backend/` directory. Node dependencies are not committed to the repository.

**Q: I see `SUPABASE_URL not set` warnings on startup.**
You have not created a `backend/.env` file. Copy `backend/.env.example` to `backend/.env` and fill in your project credentials from the Supabase dashboard under **Settings → API**.

**Q: The speech test endpoint returns a 500 error.**
The three speech model files (`scaler.pkl`, `pca.pkl`, `dementia_model.pkl`) must be present in `backend/Speech_model/`. These are not committed to Git due to file size. See `backend/Speech_model/INTEGRATE.md` for instructions on obtaining and placing them.

**Q: Python packages are missing when the ML scripts run.**
Install all dependencies from the project root:
```bash
pip install -r requirements.txt
```
If using a virtual environment, ensure it is activated before starting the Node server so child processes inherit the correct Python path.

---

## Models and Inference

**Q: How accurate is the MRI classification model?**
The DenseNet-121 model was trained on the Alzheimer's Disease Neuroimaging Initiative (ADNI) dataset and shows strong validation metrics in the training notebook (`backend/densenet121-og.ipynb`). However, clinical validation on independent cohorts is recommended before any production use.

**Q: Can I retrain the speech model on new data?**
Yes. The training notebook is at `backend/Speech_model/train_model.ipynb` and is designed to run in Google Colab. After retraining, download the three output `.pkl` files and replace the existing ones in `backend/Speech_model/`.

**Q: What audio format is required for the speech test?**
The backend accepts `.wav` and `.mp3` files up to 20 MB. For best inference quality, record at a sample rate of 16 kHz or higher in a quiet environment.

---

## Development

**Q: Can I run the project without a Supabase account?**
Yes. When `SUPABASE_URL` is not set, the backend falls back to `backend/data/local_db.json` for all data storage. This is sufficient for local development and testing but is not suitable for production or multi-user scenarios.

**Q: How do I add a new cognitive test?**
1. Add the question bank to `frontend/src/data/questions.js`.
2. Create a new page component in `frontend/src/pages/`.
3. Register the route in `frontend/src/App.jsx`.
4. Add the corresponding backend route in `backend/routes/testRoutes.js` and a handler in `backend/controllers/testController.js`.
5. Update the Supabase schema if a new table or column is required.
