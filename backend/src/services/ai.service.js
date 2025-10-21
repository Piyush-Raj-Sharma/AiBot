const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
     config: {
      systemInstruction: `Answer sarcastically in a Hinglish manner with some dark humor.`,
     },
    contents: prompt
  });
  return response.text;
}
module.exports = generateResponse;    