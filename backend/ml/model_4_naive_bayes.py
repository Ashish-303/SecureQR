"""
MODEL 4: NAIVE BAYES (MULTINOMIAL)
Dataset: urldata.csv from Kaggle
"""

import pandas as pd
import joblib
import os
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import (
    classification_report, accuracy_score, precision_score, 
    recall_score, f1_score, confusion_matrix
)

print("=" * 80)
print("MODEL 4: NAIVE BAYES (MULTINOMIAL)")
print("=" * 80)

# ================================
# URL PREPROCESSING
# ================================

def preprocess_url(url):
    """Clean and normalize URL"""
    url = str(url).lower().strip()
    url = re.sub(r'https?://', '', url)  # Remove protocol
    url = re.sub(r'www\.', '', url)       # Remove www
    url = url.rstrip('/')                 # Remove trailing slash
    return url

# ================================
# PATH SETUP  
# ================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "..", "dataset", "urldata.csv")
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "model4_naive_bayes.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "..", "models", "model4_vectorizer.pkl")

os.makedirs(os.path.join(BASE_DIR, "..", "models"), exist_ok=True)

print(f"   Looking for dataset at: {DATA_PATH}")
if not os.path.exists(DATA_PATH):
    print(f"   ERROR: Dataset not found!")
    exit(1)

# ================================
# LOAD DATASET
# ================================

print("\n[STEP 1/9] Loading dataset...")
df = pd.read_csv(DATA_PATH)
print(f"   ✓ Total rows: {len(df):,}")

# ================================
# EXPLORE DATA
# ================================

print("\n[STEP 2/9] Exploring dataset...")
print(f"   Columns: {list(df.columns)}")
print(f"   Label distribution:")
label_counts = df['label'].value_counts()
for label, count in label_counts.items():
    print(f"      {label}: {count:,} ({count/len(df)*100:.2f}%)")

# ================================
# CLEAN DATA
# ================================

print("\n[STEP 3/9] Cleaning data...")
initial_count = len(df)
df.dropna(subset=['url', 'label'], inplace=True)
df.drop_duplicates(subset=['url'], inplace=True)
print(f"   ✓ Removed {initial_count - len(df):,} invalid/duplicate rows")
print(f"   ✓ Clean dataset: {len(df):,} rows")

# ================================
# BALANCE DATASET
# ================================

print("\n[STEP 4/9] Balancing dataset...")

# Convert all labels to binary (benign vs malicious)
df['label_binary'] = df['label'].apply(
    lambda x: 'benign' if x == 'benign' else 'malicious'
)

benign = df[df['label_binary'] == 'benign']
malicious = df[df['label_binary'] == 'malicious']

print(f"   Before balancing:")
print(f"      Benign: {len(benign):,}")
print(f"      Malicious: {len(malicious):,}")

# Undersample majority class
min_count = min(len(benign), len(malicious))
print(f"   ✓ Sampling {min_count:,} from each class...")

benign_sample = benign.sample(n=min_count, random_state=42)
malicious_sample = malicious.sample(n=min_count, random_state=42)

df_balanced = pd.concat([benign_sample, malicious_sample])
df_balanced = df_balanced.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"   ✓ Balanced dataset: {len(df_balanced):,} rows (50-50 split)")

# ================================
# PREPARE FEATURES
# ================================

print("\n[STEP 5/9] Preparing features...")

# Create numeric labels (0 = benign, 1 = malicious)
df_balanced['label_num'] = df_balanced['label_binary'].apply(
    lambda x: 0 if x == 'benign' else 1
)

# Preprocess URLs
df_balanced['url_processed'] = df_balanced['url'].apply(preprocess_url)

X = df_balanced['url_processed']
y = df_balanced['label_num']

print(f"   ✓ Feature samples: {len(X):,}")
print(f"   ✓ Label distribution: Benign={sum(y==0)}, Malicious={sum(y==1)}")

# ================================
# TF-IDF VECTORIZATION
# ================================

print("\n[STEP 6/9] Creating TF-IDF features...")
vectorizer = TfidfVectorizer(
    analyzer='char',         # Character n-grams
    ngram_range=(3, 5),      # 3-5 character sequences
    max_features=10000,      # Top 10k features
    min_df=3,                # Minimum document frequency
    max_df=0.9,              # Maximum document frequency
    sublinear_tf=True        # Apply sublinear tf scaling
)

X_vectorized = vectorizer.fit_transform(X)
print(f"   ✓ Feature matrix shape: {X_vectorized.shape}")
print(f"   ✓ Sparsity: {(1.0 - X_vectorized.nnz / (X_vectorized.shape[0] * X_vectorized.shape[1]))*100:.2f}%")

# ================================
# SPLIT DATA
# ================================

print("\n[STEP 7/9] Splitting dataset (80% train, 20% test)...")
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print(f"   ✓ Train set: {X_train.shape[0]:,} samples")
print(f"   ✓ Test set: {X_test.shape[0]:,} samples")

# ================================
# TRAIN MODEL
# ================================

print("\n[STEP 8/9] Training Naive Bayes model...")
print("   This should be very fast...")

model = MultinomialNB(
    alpha=1.0,                  # Laplace smoothing parameter
    fit_prior=True              # Learn class prior probabilities
)

model.fit(X_train, y_train)
print("   ✓ Training complete!")

# ================================
# EVALUATE MODEL
# ================================

print("\n[STEP 9/9] Evaluating model...")
print("=" * 80)

# Train set predictions
y_train_pred = model.predict(X_train)
train_accuracy = accuracy_score(y_train, y_train_pred)
train_precision = precision_score(y_train, y_train_pred)
train_recall = recall_score(y_train, y_train_pred)
train_f1 = f1_score(y_train, y_train_pred)

# Test set predictions
y_test_pred = model.predict(X_test)
test_accuracy = accuracy_score(y_test, y_test_pred)
test_precision = precision_score(y_test, y_test_pred)
test_recall = recall_score(y_test, y_test_pred)
test_f1 = f1_score(y_test, y_test_pred)

# Display results
print("\n" + "=" * 80)
print("TRAIN SET METRICS")
print("=" * 80)
print(f"Accuracy:  {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")
print(f"Precision: {train_precision:.4f}")
print(f"Recall:    {train_recall:.4f}")
print(f"F1-Score:  {train_f1:.4f}")

print("\n" + "=" * 80)
print("TEST SET METRICS")
print("=" * 80)
print(f"Accuracy:  {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
print(f"Precision: {test_precision:.4f}")
print(f"Recall:    {test_recall:.4f}")
print(f"F1-Score:  {test_f1:.4f}")

print("\n" + "=" * 80)
print("CONFUSION MATRIX (Test Set)")
print("=" * 80)
cm = confusion_matrix(y_test, y_test_pred)
print(f"                  Predicted")
print(f"                Benign  Malicious")
print(f"Actual Benign     {cm[0][0]:6d}  {cm[0][1]:6d}")
print(f"       Malicious  {cm[1][0]:6d}  {cm[1][1]:6d}")

print("\n" + "=" * 80)
print("DETAILED CLASSIFICATION REPORT (Test Set)")
print("=" * 80)
print(classification_report(
    y_test, 
    y_test_pred, 
    target_names=['Benign', 'Malicious'],
    digits=4
))

# ================================
# SAVE MODEL
# ================================

print("\n" + "=" * 80)
print("SAVING MODEL")
print("=" * 80)

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print(f"✓ Model saved: {MODEL_PATH}")
print(f"✓ Vectorizer saved: {VECTORIZER_PATH}")

print("\n" + "=" * 80)
print("✅ MODEL 4 TRAINING COMPLETE!")
print("=" * 80)

# ================================
# SUMMARY FOR COMPARISON TABLE
# ================================

print("\n" + "=" * 80)
print("📋 COPY THESE VALUES FOR YOUR COMPARISON TABLE:")
print("=" * 80)
print(f"Model: Naive Bayes (Multinomial)")
print(f"\nTRAIN SET:")
print(f"  Accuracy:  {train_accuracy:.4f}")
print(f"  Precision: {train_precision:.4f}")
print(f"  Recall:    {train_recall:.4f}")
print(f"  F1-Score:  {train_f1:.4f}")
print(f"\nTEST SET:")
print(f"  Accuracy:  {test_accuracy:.4f}")
print(f"  Precision: {test_precision:.4f}")
print(f"  Recall:    {test_recall:.4f}")
print(f"  F1-Score:  {test_f1:.4f}")
print("=" * 80)
