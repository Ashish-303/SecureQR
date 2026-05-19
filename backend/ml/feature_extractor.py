# backend/ml/feature_extractor.py

import re
import math
import numpy as np
from urllib.parse import urlparse

# Suspicious keywords often used in phishing
SUSPICIOUS_WORDS = [
    "login", "verify", "update", "secure", "account",
    "bank", "confirm", "password", "signin", "wp",
    "admin", "user", "security", "ebayisapi", "webscr"
]


# Check if URL contains IP address instead of domain
def has_ip(url):
    pattern = r'(([0-9]{1,3}\.){3}[0-9]{1,3})'
    return 1 if re.search(pattern, url) else 0


# Count suspicious words
def suspicious_word_count(url):
    count = 0
    for word in SUSPICIOUS_WORDS:
        if word in url.lower():
            count += 1
    return count


# Calculate entropy of URL (measure randomness)
def url_entropy(url):
    prob = [float(url.count(c)) / len(url) for c in dict.fromkeys(url)]
    entropy = -sum([p * math.log2(p) for p in prob])
    return entropy


# Count digits
def digit_count(url):
    return sum(c.isdigit() for c in url)


# Count special characters
def special_char_count(url):
    return len(re.findall(r'[!@#$%^&*(),?":{}|<>]', url))


# Count subdomains
def subdomain_count(url):
    domain = urlparse(url).netloc
    return domain.count('.')


# Check HTTPS
def is_https(url):
    return 1 if url.startswith("https") else 0


# Check for @ symbol
def has_at_symbol(url):
    return 1 if "@" in url else 0


# Check for double slash in middle
def has_double_slash(url):
    return 1 if "//" in url[8:] else 0


# Check URL length
def url_length(url):
    return len(url)


# Count hyphens
def hyphen_count(url):
    return url.count("-")


# Count dots
def dot_count(url):
    return url.count(".")


# Main feature extractor
def extract_features(url):
    features = [

        url_length(url),           # length of URL
        digit_count(url),          # digits
        special_char_count(url),   # special chars
        dot_count(url),            # dots
        hyphen_count(url),         # hyphens
        subdomain_count(url),      # subdomains

        has_ip(url),               # IP instead of domain
        is_https(url),             # https
        has_at_symbol(url),        # @ symbol
        has_double_slash(url),     # double slash
        suspicious_word_count(url),# suspicious words

        url_entropy(url)           # entropy

    ]

    return np.array(features)
    

# Test block
if __name__ == "__main__":
    test_url = "http://secure-login-update123.com"
    print(extract_features(test_url))
