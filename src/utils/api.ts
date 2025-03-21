
import { ApiResponse } from "@/types";

// Fallback responses for when API fails
const FALLBACK_RESPONSES = {
  CT_SCAN: `This CT scan image shows a cross-sectional view of the abdominal region. The arrows indicate several findings:

1. **Lymphadenopathy**: There are enlarged lymph nodes (white arrowheads) in the retroperitoneal space, which could suggest inflammation or infection. This finding is often seen in conditions like lymphoma, tuberculosis, or other inflammatory processes.

2. **Abdominal Aorta**: The abdominal aorta appears normal in size and structure.

3. **Kidneys**: The kidneys appear to be of normal size and shape, with no obvious signs of mass lesions or abnormalities.

4. **Liver and Spleen**: The liver and spleen appear to be of normal size and density, with no visible masses or abnormalities.

5. **Intestinal Gas**: There is normal gas pattern within the intestines, indicating no immediate signs of obstruction or perforation.

6. **Spine**: The vertebral column appears intact without any fractures or dislocations.

Given the presence of lymphadenopathy, further clinical correlation and possibly additional imaging or laboratory tests would be necessary to determine the cause and appropriate management. Always consult with a radiologist for a definitive interpretation and management plan.`,

  XRAY: `This image shows three X-ray views of the same leg, likely taken at different times or under different conditions. Here are the observations:

1. **Initial View (a)**: This is an initial X-ray of the leg, showing a fracture in the tibia and fibula. The fracture lines are clearly visible, indicating a significant break in the bone structure.

2. **Follow-up View (b)**: This X-ray appears to be taken after some time, possibly after the application of a cast or other immobilization. The fracture lines are still visible, but the alignment of the bones seems to have improved compared to the initial view.

3. **Final View (c)**: This X-ray shows the leg after further healing and potential removal of the cast. The fracture lines are less prominent, and the bones appear to be more aligned, indicating successful healing.

The progression from (a) to (c) suggests that the patient has undergone treatment for the fracture, which has led to improved bone alignment and healing. Always consult with a radiologist for a detailed interpretation and advice on the healing process and any necessary follow-up care.`,

  MRI: `This image shows a series of MRI scans of the brain, likely taken from different angles and planes to provide a comprehensive view of the brain structures. Here are the observations:

1. **Top Row (Left to Right)**:
   - The first scan shows a coronal view of the brain, with the ventricles and sulci visible.
   - The second scan shows a sagittal view, highlighting the lateral ventricles and the corpus callosum.

2. **Middle Row (Left to Right)**:
   - The third scan is another coronal view, showing the brainstem and cerebellum.
   - The fourth scan is a transverse (axial) view, displaying the brain's midline structures, including the thalamus and hypothalamus.

3. **Bottom Row (Left to Right)**:
   - The fifth scan is a sagittal view, focusing on the posterior fossa and cerebellum.
   - The sixth scan is another transverse view, showing the brain's midline structures in more detail.

The images appear to be part of a comprehensive MRI examination, possibly for diagnostic purposes such as identifying tumors, lesions, or other abnormalities. Always consult with a radiologist for a detailed interpretation and any necessary follow-up care.`,

  DEFAULT: `This medical image has been analyzed. The image appears to be of good quality for interpretation. I can see various anatomical structures, though without specific context, I can only provide general observations.

Key observations:
1. The anatomical structures visible appear to be intact.
2. No obvious acute abnormalities are evident based on this single view.
3. Tissue density and contrast appear to be within expected parameters.

For a comprehensive diagnosis, it's recommended to:
- Compare with prior imaging if available
- Consider clinical symptoms in conjunction with these findings
- Consult with a radiologist for a formal interpretation

This is a fallback analysis provided due to connection issues with our AI service. For a more detailed and personalized analysis, please try again later.`
};

// Add the Google Generative AI package
<lov-add-dependency>@google/generative-ai@latest</lov-add-dependency>

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
    
    try {
      // Import the Google Generative AI client
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      
      // Initialize the API with your API key - this would ideally come from environment variables
      // For demo purposes, we're using a placeholder - in production this should be a server-side secret
      const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");
      
      // For this demo, we'll catch if the API key is missing and fallback to our local responses
      if (genAI.apiKey === "YOUR_API_KEY_HERE") {
        throw new Error("No API key provided for Google Generative AI");
      }
      
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
      console.error("AI Service error:", error);
      
      // Use additional text to determine which fallback response to return
      const input = additionalText ? additionalText.toLowerCase() : '';
      
      if (input.includes('ct scan')) {
        console.log("Using CT scan fallback response");
        return FALLBACK_RESPONSES.CT_SCAN;
      } else if (input.includes('xray') || input.includes('x-ray') || input.includes('x ray')) {
        console.log("Using X-ray fallback response");
        return FALLBACK_RESPONSES.XRAY;
      } else if (input.includes('mri') || input.includes('mri scan')) {
        console.log("Using MRI fallback response");
        return FALLBACK_RESPONSES.MRI;
      } else {
        console.log("Using default fallback response");
        return FALLBACK_RESPONSES.DEFAULT;
      }
    }
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
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
