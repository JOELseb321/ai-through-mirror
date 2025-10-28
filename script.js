import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@latest';

// Load small text-generation model
const generator = await pipeline('text-generation', 'Xenova/distilgpt2');

const buttons = document.querySelectorAll('.tones button');
const input = document.getElementById('inputText');
const output = document.getElementById('output');

buttons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const tone = btn.dataset.tone;
    const text = input.value.trim();
    if (!text) return alert("Please type a message first.");

    output.textContent = "Thinking...";

    const prompt = `Rephrase this message to sound more ${tone}:\n"${text}"`;

    const result = await generator(prompt, { max_new_tokens: 60 });
    output.textContent = result[0].generated_text;
  });
});
