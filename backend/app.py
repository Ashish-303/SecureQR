from flask import Flask
from flask_cors import CORS

from routes.scan import scan_bp


app = Flask(__name__)

CORS(app)

app.register_blueprint(scan_bp)


if __name__ == "__main__":

    print("Starting SecureQR backend...")

    app.run(debug=True, host="127.0.0.1", port=5000)