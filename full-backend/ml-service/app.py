from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, numpy as np
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "<h1>Flask server is running!</h1>"

# Load local tabular models
models = {
    "heart": joblib.load("models/heart_disease_model.sav"),
    "diabetes": joblib.load("models/diabetes_model.sav"),
    "parkinson": joblib.load("models/parkinsons_model.sav"),
    "breast-cancer": joblib.load("models/breast-cancer.pkl"),
}

# Feature order for tabular models
feature_orders = {
    "diabetes": [
        "pregnancies", "glucose", "bloodPressure", "skinThickness",
        "insulin", "bmi", "dpf", "age"
    ],
    "heart": [
        "age", "sex", "cp", "trestbps", "chol", "fbs",
        "restecg", "thalach", "exang", "oldpeak", "slope",
        "ca", "thal"
    ],
    "parkinson": [
        "fo", "fhi", "flo", "jitter", "shimmer",
        "nhr", "hnr", "rpde", "dfa", "spread1", "spread2", "ppe"
    ],
    "breast-cancer": [
        "id",
        # Mean features
        "radius_mean", "texture_mean", "perimeter_mean", "area_mean",
        "smoothness_mean", "compactness_mean", "concavity_mean", "concave_points_mean",
        "symmetry_mean", "fractal_dimension_mean",

        # SE features
        "radius_se", "texture_se", "perimeter_se", "area_se",
        "smoothness_se", "compactness_se", "concavity_se", "concave_points_se",
        "symmetry_se", "fractal_dimension_se",

        # Worst features
        "radius_worst", "texture_worst", "perimeter_worst", "area_worst",
        "smoothness_worst", "compactness_worst", "concavity_worst", "concave_points_worst",
        "symmetry_worst", "fractal_dimension_worst"
    ]
}

@app.route("/predict/<disease>", methods=["POST"])
def predict(disease):
    try:
        if disease in models:
            data = request.json
            if disease in feature_orders:
                features = np.array([data[f] for f in feature_orders[disease]]).reshape(1, -1)
            else:
                features = np.array(list(data.values())).reshape(1, -1)

            prediction = int(models[disease].predict(features)[0])
            return jsonify({"prediction": prediction})

        return jsonify({"error": "Invalid disease"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
