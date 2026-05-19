import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score


print("Starting SecureQR model training...")

# ================================
# PATH SETUP
# ================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(BASE_DIR, "..", "dataset", "combined_clean.csv")

MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "secureqr_model.pkl")

VECTORIZER_PATH = os.path.join(BASE_DIR, "..", "models", "vectorizer.pkl")

os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)


# ================================
# LOAD DATASET
# ================================

print("Loading dataset...")
df = pd.read_csv(DATA_PATH)

print(f"Dataset loaded: {len(df)} rows")


# ================================
# CLEAN DATA
# ================================

df.dropna(inplace=True)
df.drop_duplicates(inplace=True)

print(f"Dataset after cleaning: {len(df)} rows")


# ================================
# CONVERT LABELS
# ================================

# benign → 0
# malicious → 1

df["label"] = df["type"].apply(lambda x: 0 if x == "benign" else 1)

X = df["url"]
y = df["label"]


# ================================
# TF-IDF VECTORIZER
# ================================

print("Creating TF-IDF features...")

vectorizer = TfidfVectorizer(
    analyzer="char",
    ngram_range=(2, 5),
    max_features=50000
)

X_vectorized = vectorizer.fit_transform(X)


# ================================
# SPLIT DATA
# ================================

print("Splitting dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# ================================
# TRAIN MODEL
# ================================

print("Training RandomForest model...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    n_jobs=-1,
    random_state=42
)

model.fit(X_train, y_train)


# ================================
# EVALUATE MODEL
# ================================

print("Evaluating model...")

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"\nAccuracy: {accuracy:.4f}\n")

print(classification_report(y_test, y_pred))


# ================================
# SAVE MODEL
# ================================

print("\nSaving model...")

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("\nModel saved successfully!")
print("Path:", MODEL_PATH)
print("Vectorizer saved at:", VECTORIZER_PATH)
