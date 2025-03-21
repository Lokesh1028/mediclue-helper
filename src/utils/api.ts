
import { ApiResponse } from "@/types";

export async function analyzeImage(
  imageFile: File,
  additionalText?: string
): Promise<string> {
  try {
    if (!imageFile) {
      throw new Error("No image file provided");
    }

    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Import the Google Generative AI client
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    // Initialize the API with the provided API key
    const genAI = new GoogleGenerativeAI("AIzaSyAzQBRwAjhCDMYc2r47M2fCEMDRaEO25hM");
    
    // Create a model instance
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-pro-exp-02-05", 
      systemInstruction: `You are an intelligent virtual health assistant. The user will either upload a medical scan (X-ray, CT, or MRI) or describe their symptoms in plain language. Based on the input:

First, try to analyze and understand the issue from the given image or description.
If the input is unclear or lacks detail, politely ask 2–3 relevant follow-up questions to gather more information.
Always mention that answering the questions is optional, and you're happy to give an answer directly if they prefer.
Once enough information is available (from image, description, or answers):
Identify whether the condition is minor or serious.
If minor (e.g., cold, cough, mild fever), suggest immediate home care, basic medications, and self-care tips.
If serious or long-term, explain the potential condition, symptoms, and suggest the urgency level and which type of doctor to consult.
Always be empathetic, helpful, and avoid medical jargon when possible. If uncertain, suggest seeking professional medical help.`,
    });
    
    // Extract proper base64 data (remove the data:image/jpeg;base64, prefix if present)
    const base64Data = base64Image.split(",")[1] || base64Image;
    
    // Prepare user message with image
    let userMessage = "Analyze this medical image:";
    if (additionalText) {
      userMessage += `\n\nAdditional context: ${additionalText}`;
    }
    
    // Configure generation parameters
    const generationConfig = {
      temperature: 0.2,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
    };
    
    // Create the content parts - text and image
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: imageFile.type,
      },
    };
    
    // Add minimum delay to make it feel more realistic
    const minDelay = new Promise(resolve => setTimeout(resolve, 5000));
    
    // Call the API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }, imagePart] }],
      generationConfig,
    });
    
    // Wait for minimum delay to complete
    await minDelay;
    
    // Return the response text
    const response = result.response;
    return response.text();
    
  } catch (error) {
    console.error("Analysis error:", error);
    throw error; // Propagate the error to be handled by the caller
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = error => reject(error);
  });
}
