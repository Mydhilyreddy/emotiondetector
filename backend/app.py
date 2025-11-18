from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch

app = Flask(__name__)
CORS(app)

MODEL_NAME = "SamLowe/roberta-base-go_emotions"


print("Loading model... Please wait (first time takes 1–3 minutes).")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
print("Model loaded successfully!")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")

    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    scores = torch.softmax(outputs.logits, dim=1).detach().numpy()[0]

    labels = model.config.id2label
    result = {labels[i]: float(scores[i]) for i in range(len(scores))}
    return jsonify(result)

@app.route("/", methods=["GET"])
def home():
    return {"message": "Emotion Detector Backend Running"}

if __name__ == "__main__":
    app.run(port=5000)



