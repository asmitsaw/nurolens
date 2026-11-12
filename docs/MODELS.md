# NeuroLens Machine Learning Pipelines

This document details the architecture, feature processing, and inference interfaces for the machine learning models deployed in NeuroLens.

---

## 1. Neuroimaging Classifier (DenseNet-121)

- **Artifact**: `backend/ml_model/best_baseline_densenet121.pth`
- **Driver Script**: `backend/ml_model/inference_mri.py`
- **Framework**: PyTorch / Torchvision

### Pipeline Details
- **Architecture**: Dense Convolutional Network (DenseNet-121) pretrained on ImageNet and fine-tuned on structural brain MRI slices.
- **Input Dimensions**: Single axial slice image formatted to $224 \times 224 \times 3$.
- **Preprocessing**:
  - Bilinear resize and center crop to $224 \times 224$.
  - Channel normalization using standard ImageNet mean (`[0.485, 0.456, 0.406]`) and standard deviation (`[0.229, 0.224, 0.225]`).
- **Target Classes**:
  1. `NonDemented`
  2. `VeryMildDemented`
  3. `MildDemented`
  4. `ModerateDemented`
- **Output**: Softmax probability distribution and predicted class label.

---

## 2. Tabular Cognitive Risk & Normative Modeling

- **Artifacts**:
  - `backend/ml_model/cognitive_risk_model.pkl` (XGBoost Classifier)
  - `backend/ml_model/mmse_norm_model.pkl` (Normative Linear Model)
  - `backend/ml_model/moca_norm_model.pkl` (Normative Linear Model)
  - `backend/ml_model/normative_lookup.json` (Demographic lookup tables)
- **Driver Script**: `backend/ml_model/inference_cognitive.py`

### Feature Set
- **Patient Demographics**: Age, years of formal education, biological sex, dominant handedness.
- **Clinical Scales**: MMSE aggregate and domain scores, MoCA aggregate and domain scores.
- **Normative Transformation**:
  - Raw scores are mapped against age- and education-stratified normative baselines.
  - Generates standard Z-scores representing distance from healthy demographic cohort means.
- **Classification Output**: Predicted risk category (`Normal`, `Mild Cognitive Impairment`, `Probable Impairment`).

---

## 3. Speech & Vocal Biomarker Pipeline

- **Artifacts**:
  - `backend/Speech_model/scaler.pkl`
  - `backend/Speech_model/pca.pkl`
  - `backend/Speech_model/dementia_model.pkl`
- **Driver Script**: `backend/Speech_model/inference.py`
- **Framework**: Hugging Face Transformers (`Wav2Vec2Model`), Librosa, Scikit-Learn

### Processing Flow
1. **Audio Preprocessing**: Ingests `.wav` voice recording, converts to 16 kHz mono.
2. **Representation Extraction**: Pass raw waveform through pretrained Wav2Vec2 backbone to obtain high-dimensional contextual embeddings.
3. **Temporal Pooling**: Aggregates sequence frame representations into a fixed-length summary vector.
4. **Feature Normalization & PCA**: Applies pre-fitted StandardScaler followed by Principal Component Analysis.
5. **Inference**: Evaluates classification head to generate risk probability score and stability percentage.
