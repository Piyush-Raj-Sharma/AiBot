const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function generateResponse(chat_history) {
  console.log(chat_history);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: chat_history,
      config: {
        systemInstruction:
          "Answer in short Hinglish with a sarcastic and darkly funny tone. Keep it cool and to the point.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("❌ Error generating AI response:", error);
    return "Kuch gadbad ho gayi yaar 😅 (Server-side error)";
  }
}

module.exports = generateResponse;
