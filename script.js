import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.15.0";

// load a small sentiment-analysis model (works offline once cached)
const classifier = await pipeline("text-classification", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");

const inputBox = document.getElementById("input");
const outputBox = document.getElementById("output");

async function mirrorTone(tone) {
  const text = inputBox.value;
  const result = await classifier(text);
  let newText;

  if (tone === "Polite") newText = `Perhaps say it more gently: "${text}"`;
  else if (tone === "Confident") newText = `Say this boldly: "${text.toUpperCase()}"`;
  else if (tone === "Emotional") newText = `Express it with feeling: "${text}!"`;

  outputBox.value = `Analysis: ${result[0].label} (${result[0].score.toFixed(2)})\n\n${newText}`;
}
