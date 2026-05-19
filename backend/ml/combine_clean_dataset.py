import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

malicious_path = os.path.join(BASE_DIR, "dataset", "malicious_phish.csv")
safe_path = os.path.join(BASE_DIR, "dataset", "safe_urls_100k.csv")

print("Loading datasets...")

malicious_df = pd.read_csv(malicious_path)
safe_df = pd.read_csv(safe_path)

# Rename columns if needed
malicious_df.columns = ["url", "type"]
safe_df.columns = ["url", "type"]

# Convert safe dataset label
safe_df["type"] = "benign"

# Convert malicious dataset labels
malicious_df["type"] = malicious_df["type"].apply(
    lambda x: "benign" if x == "benign" else "malicious"
)

# Combine
combined_df = pd.concat([malicious_df, safe_df])

# Remove duplicates
combined_df = combined_df.drop_duplicates(subset="url")

# Save clean dataset
output_path = os.path.join(BASE_DIR, "dataset", "combined_clean.csv")
combined_df.to_csv(output_path, index=False)

print("Clean dataset saved at:", output_path)
print(combined_df["type"].value_counts())
