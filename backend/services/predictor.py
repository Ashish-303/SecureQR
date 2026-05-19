import joblib
import os
import re

# ================================
# PATH SETUP
# ================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(BASE_DIR)  # go one more level up to project root

MODEL_PATH = os.path.join(ROOT_DIR, "models", "model3_svm.pkl")
VECTORIZER_PATH = os.path.join(ROOT_DIR, "models", "model3_vectorizer.pkl")

# ================================
# LOAD MODEL
# ================================

print("Loading SecureQR SVM model...")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

print("Model loaded successfully.")

# ================================
# URL PREPROCESSING
# ================================

def preprocess_url(url):
    url = str(url).lower().strip()
    url = re.sub(r'https?://', '', url)
    url = re.sub(r'www\.', '', url)
    url = url.rstrip('/')
    return url

# ================================
# PREDICT FUNCTION
# ================================

def predict_url(url):

    try:
        # Preprocess URL (must match how model was trained)
        processed_url = preprocess_url(url)

        # Convert URL to TF-IDF features
        features = vectorizer.transform([processed_url])

        # Prediction
        prediction = model.predict(features)[0]

        # CalibratedClassifierCV supports predict_proba
        probabilities = model.predict_proba(features)[0]
        confidence = round(float(max(probabilities)), 4)

        if prediction == 0:
            status = "SAFE"
        else:
            status = "MALICIOUS"

        return {
            "status": status,
            "confidence": confidence
        }

    except Exception as e:

        return {
            "status": "ERROR",
            "confidence": 0.0,
            "error": str(e)
        }