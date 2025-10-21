const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function generateResponse(chat_history) {
  try {
    // Convert history into the structure Gemini expects
    const formattedHistory = chat_history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }], // ✅ Correct field (text)
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction:
  "Answer in short Hinglish with a sarcastic and darkly funny tone. Keep it cool and to the point."

      },
    });

    // ✅ Extract proper response text
    const output =
      response.output_text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";

    return output;
  } catch (error) {
    console.error("❌ Error generating AI response:", error);
    return "Kuch gadbad ho gayi yaar 😅 (Server-side error)";
  }
}

module.exports = generateResponse;
