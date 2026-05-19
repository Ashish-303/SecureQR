<div align="center">
  <h1>🛡️ SecureQR - Malicious QR Code Detection System</h1>
  <p>An intelligent web application that detects and blocks malicious URLs hidden within QR codes using Machine Learning.</p>
  <p><b>Developed by: Ashish Bavaliya</b></p>
</div>

<br />

## 📖 Overview

**SecureQR** is a comprehensive, machine-learning-powered system designed to identify and classify URLs embedded in QR codes as either "Safe" or "Malicious." In an era where phishing attacks and malicious links are increasingly hidden behind QR codes, this project provides a reliable layer of defense.

This system was built with a modern React frontend and a fast Flask backend, leveraging a Support Vector Machine (SVM) model trained on a large dataset of malicious and benign URLs to provide real-time threat analysis.

## ✨ Key Features

- **📷 Real-Time QR Scanning**: Scan QR codes directly using your device's camera.
- **🖼️ Image Uploads**: Upload saved QR code images for instant analysis.
- **🔗 Direct URL Checking**: Manually enter URLs to check their safety status.
- **🧠 Machine Learning Classification**: Powered by a robust SVM (Support Vector Machine) model, tested against multiple algorithms (Random Forest, Logistic Regression, Naive Bayes, Gradient Boosting) for optimal accuracy.
- **⚡ Fast & Responsive**: Built with React and Vite for a seamless, interactive user experience.

## 🛠️ Technology Stack

**Frontend**
- React.js (v18)
- Vite (Build Tool)
- Framer Motion (Animations)
- React QR Reader / HTML5-QRCode

**Backend**
- Python (v3.8+)
- Flask & Flask-CORS
- Scikit-learn (Machine Learning)
- Pandas & Joblib

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SecureQR.git
cd SecureQR
```

### 2. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend

# Install the required Python dependencies
pip install -r requirements.txt

# Start the Flask API server
python app.py
```
*The backend server will start running at `http://127.0.0.1:5000`.*

### 3. Frontend Setup

Open a new terminal window and navigate to the `frontend` directory:

```bash
cd frontend

# Install the Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend application will be available at `http://localhost:5173` (or the port specified in your terminal).*

## 📂 Project Structure

```text
SecureQR/
├── backend/            # Flask API, routes, and model prediction logic
│   ├── ml/             # ML training scripts and dataset processing
│   ├── routes/         # API endpoints (e.g., /api/scan)
│   ├── services/       # URL preprocessing and prediction services
│   ├── app.py          # Main Flask application entry point
│   └── requirements.txt# Backend dependencies
├── frontend/           # React application built with Vite
│   ├── src/            # Components, styles, and main logic
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
├── models/             # Serialized ML models (.pkl) and vectorizers
├── dataset/            # Datasets used for model training
└── README.md           # Project documentation
```

## 👨‍💻 Author

**Ashish Bavaliya**

If you found this project helpful or have any questions, feel free to reach out!

- **LinkedIn**: [Connect with me on LinkedIn](https://www.linkedin.com/in/your-linkedin-profile)  *(Update this link)*
- **GitHub**: [@your-username](https://github.com/your-username) *(Update this link)*
