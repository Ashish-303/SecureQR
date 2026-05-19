class Config:
    # Basic app settings
    APP_NAME = "SecureQR"
    DEBUG = True

    HOST = "127.0.0.1"
    PORT = 5000

    # Frontend URL (CORS)
    FRONTEND_URL = "http://localhost:5173"

    # -----------------------------
    # Future configuration (Phase 2+)
    # -----------------------------

    # Database (to be used later)
    DATABASE_URI = None
    # Example:
    # DATABASE_URI = "mongodb://localhost:27017/secureqr"

    # Machine Learning model path (to be used later)
    ML_MODEL_PATH = None
    # Example:
    # ML_MODEL_PATH = "models/malicious_qr_model.pkl"

    # Security / API keys (future use)
    SECRET_KEY = None
    # Example:
    # SECRET_KEY = "your-secret-key"

    # External threat intelligence APIs (future)
    GOOGLE_SAFE_BROWSING_API_KEY = None
    VIRUSTOTAL_API_KEY = None
