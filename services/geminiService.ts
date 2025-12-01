import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize securely, handling the case where env might be missing during preview
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.error("Failed to initialize Gemini Client", e);
}

const audioCache = new Map<string, ArrayBuffer>();

export const getSmartBuddyHelp = async (
  question: string, 
  wrongAnswer: string, 
  studentName: string,
  voice: 'MALE' | 'FEMALE'
): Promise<string> => {
  if (!ai) {
    // Fallback if no API key is configured
    return `Review the concept again, ${studentName}. Consider the specific function described in the question.`;
  }

  try {
    const tone = voice === 'MALE' ? 'like a supportive academic coach' : 'like a knowledgeable ICT subject expert';
    
    const prompt = `
      You are "Smart Buddy", an expert AI Tutor for Year 10 students (approx. 15 years old) studying for their IGCSE/GCSE ICT exams.
      The student just answered a quiz question incorrectly.
      
      Question: "${question}"
      Student's Wrong Answer: "${wrongAnswer}"
      
      Provide a concise, academic hint (maximum 2 sentences). 
      Focus on guiding them to the correct technical concept.
      Do NOT give the answer directly. 
      Speak ${tone}.
      Use appropriate academic terminology, do not use childish language.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Review the glossary terms and try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Connection issue. Please review the material and try again, ${studentName}.`;
  }
};

export const speakText = async (
  text: string, 
  voice: 'MALE' | 'FEMALE'
): Promise<ArrayBuffer | null> => {
    // Create a cache key based on voice and text content
    const cacheKey = `${voice}:${text}`;
    if (audioCache.has(cacheKey)) {
        return audioCache.get(cacheKey)!;
    }

    if (!ai) return null;

    try {
        // Map internal voice types to Gemini voice names
        // MALE: Fenrir (Deep, authoritative but friendly)
        // FEMALE: Kore (Clear, soothing, professional)
        const voiceName = voice === 'MALE' ? 'Fenrir' : 'Kore';
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
             const binaryString = atob(base64Audio);
             const len = binaryString.length;
             const bytes = new Uint8Array(len);
             for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
             }
             const buffer = bytes.buffer;
             audioCache.set(cacheKey, buffer);
             return buffer;
        }
    } catch (e) {
        console.error("TTS error", e);
    }
    return null;
}