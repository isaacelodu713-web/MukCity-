
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables as required by guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSpiritualEncouragement = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "You are a helpful, compassionate spiritual guide for a church website. Provide scriptural encouragement based on the user's needs. Keep responses under 150 words. Focus on being uplifting and faith-centered.",
      },
    });
    // Directly access the .text property from the GenerateContentResponse object.
    return response.text || "I'm sorry, I'm unable to provide guidance at this moment. Please reach out to our pastoral team for support.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently resting. Please try again later or contact our church office directly.";
  }
};
