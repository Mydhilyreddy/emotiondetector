const textInput = document.getElementById("textInput");
const detectBtn = document.getElementById("detectBtn");
const resultCard = document.getElementById("resultCard");
const emoji = document.getElementById("emoji");
const emotionLabel = document.getElementById("emotionLabel");
const confidenceText = document.getElementById("confidenceText");
const progressFill = document.getElementById("progressFill");
const recentList = document.getElementById("recentList");
const voiceBtn = document.getElementById("voiceBtn");

// Simple emotion dictionary
const emotions = {
    joy: ["happy", "excited", "love", "great", "awesome"],
    sad: ["sad", "down", "unhappy", "depressed"],
    anger: ["angry", "mad", "furious", "annoyed"],
    fear: ["scared", "afraid", "terrified"],
    surprise: ["surprised", "shocked", "wow"],
};

// Emoji mapping
const emojiMap = {
    joy: "😊",
    sad: "😔",
    anger: "😡",
    fear: "😨",
    surprise: "😮",
    neutral: "🙂"
};

function detectEmotion(text) {
    const lower = text.toLowerCase();

    for (let emo in emotions) {
        if (emotions[emo].some(word => lower.includes(word))) {
            return emo;
        }
    }
    return "neutral";
}

function showResult(emotion) {
    resultCard.classList.remove("hidden");
    emoji.textContent = emojiMap[emotion];
    emotionLabel.textContent = emotion.toUpperCase();
    confidenceText.textContent = "Top emotion detected";
    progressFill.style.width = "90%";
}

function addRecent(text, emotion) {
    const div = document.createElement("div");
    div.className = "recent-item";
    div.innerHTML = `<span>${text}</span> <span style="color:#0094b8">${emotion.toUpperCase()}</span>`;
    recentList.prepend(div);
}

detectBtn.onclick = () => {
    const text = textInput.value.trim();
    if (!text) return;

    const emotion = detectEmotion(text);
    showResult(emotion);
    addRecent(text, emotion);
};

voiceBtn.onclick = () => {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    voiceBtn.textContent = "🎙️";

    recognition.onresult = e => {
        textInput.value = e.results[0][0].transcript;
        voiceBtn.textContent = "🎤";
    };

    recognition.onerror = () => {
        voiceBtn.textContent = "🎤";
    };
};





