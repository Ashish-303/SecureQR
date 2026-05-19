from flask import Blueprint, request, jsonify
from services.predictor import predict_url

scan_bp = Blueprint("scan", __name__)


@scan_bp.route("/api/scan", methods=["POST"])
def scan_url():

    try:

        data = request.get_json()

        if "url" not in data:
            return jsonify({"error": "URL is required"}), 400

        url = data["url"]

        result = predict_url(url)

        return jsonify(result)

    except Exception as e:

        return jsonify({"error": str(e)}), 500