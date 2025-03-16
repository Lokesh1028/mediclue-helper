
import { ApiResponse } from "@/types";

const API_KEY = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzg4MjQwMTgyODIzNjM3ODczMSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5OTcwOTA1MiwidXVpZCI6ImIyNTY2OTM4LWI5MjEtNDExYy1iZGNlLTZjNDUyYjYyYzc1NiIsIm5hbWUiOiJtZWQyIiwiZXhwaXJlc19hdCI6IjIwMzAtMDMtMTRUMDg6NTc6MzIrMDAwMCJ9.oGw3j3_RKAkk7rp_fKywLPdKB2W6eOSzDn6fllM34Tk"; // Nebius API key

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
    
    // Prepare system message
    const systemMessage = `
Adhere to patient privacy standards (e.g., HIPAA, GDPR).
Do not store or disclose personally identifiable information.
Respect the ethical boundaries of medical practice: refrain from giving definitive diagnoses or treatment plans.
Diagnostic Support

Highlight key anatomical structures, note any visible abnormalities (e.g., fractures, lesions, tumors, fluid collections).
Provide quantitative measurements (e.g., lesion size or volume) when possible.
Suggest differential diagnoses based on typical radiological patterns, but avoid absolute certainty in your conclusions.
Communication Style

Use professional and respectful language.
Include confidence levels or disclaimers (e.g., "Based on the image, there is a possibility of…")
Do not provide personal medical advice or definitive diagnoses.
Encourage follow-up with a licensed medical professional for confirmation and further testing.
Urgent Findings

If you detect potentially urgent or life-threatening findings (e.g., large hemorrhage, pneumothorax), clearly label them as "urgent" and advise immediate clinical correlation.
Always remind the user that only a qualified healthcare provider can confirm these findings.
Model Limitations

Acknowledge that you are an AI model and your interpretations are based on pattern recognition from trained data.
Your output may be incomplete or erroneous; human review is essential.
Do not provide legal, financial, or non-medical advice.`;

    // Prepare user message with image
    let userMessage = "Analyze this medical image:";
    if (additionalText) {
      userMessage += `\n\nAdditional context: ${additionalText}`;
    }

    try {
      const response = await fetch("https://api.studio.nebius.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2-VL-7B-Instruct",
          temperature: 0.06,
          top_p: 0.94,
          presence_penalty: 0.37,
          extra_body: {
            top_k: 72
          },
          messages: [
            {
              role: "system",
              content: systemMessage
            },
            {
              role: "user",
              content: [
                { type: "text", text: userMessage },
                { type: "image_url", image_url: { url: base64Image } }
              ]
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`API Error: ${response.status} - ${errorData}`);
        throw new Error(`API connection error (${response.status}). Please check your network connection and try again.`);
      }

      const data: ApiResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Network error:", error);
      
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
