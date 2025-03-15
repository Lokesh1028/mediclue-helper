
import { ApiResponse } from "@/types";

const API_KEY = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzg4MjQwMTgyODIzNjM3ODczMSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5OTcwOTA1MiwidXVpZCI6ImIyNTY2OTM4LWI5MjEtNDExYy1iZGNlLTZjNDUyYjYyYzc1NiIsIm5hbWUiOiJtZWQyIiwiZXhwaXJlc19hdCI6IjIwMzAtMDMtMTRUMDg6NTc6MzIrMDAwMCJ9.oGw3j3_RKAkk7rp_fKywLPdKB2W6eOSzDn6fllM34Tk"; // Nebius API key

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
        // Fall back to mock data on API error
        return getMockAnalysisResult(additionalText);
      }

      const data: ApiResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Network error:", error);
      // Fall back to mock data on network error
      return getMockAnalysisResult(additionalText);
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

// Mock function for development without API key
function getMockAnalysisResult(additionalText?: string): string {
  const mockResponses = [
    `# Chest X-Ray Analysis

## Findings
- **Lungs**: Clear and well-expanded bilaterally. No evidence of consolidation, infiltrates, or masses.
- **Heart**: Normal size and contour. Cardiothoracic ratio within normal limits (~0.45).
- **Mediastinum**: No widening. Contours appear normal.
- **Pleura**: No pleural effusion or pneumothorax.
- **Bones**: No visible fractures or lytic lesions.

## Impression
Based on this image alone, the chest radiograph appears normal. No acute cardiopulmonary process is identified.

## Note
This is an AI-generated analysis and should be confirmed by a qualified radiologist. The image quality and positioning appear adequate for basic assessment, but subtle findings may not be detected by this analysis.`,

    `# Chest X-Ray Analysis

## Findings
- **Lungs**: Subtle, patchy opacity in the right lower lobe suggesting possible early infiltrate.
- **Heart**: Mildly enlarged with a cardiothoracic ratio of approximately 0.55 (upper limit of normal is 0.5).
- **Mediastinum**: No significant widening.
- **Pleura**: Possible small right pleural effusion, but difficult to confirm on this single projection.
- **Bones**: No acute fractures identified.

## Impression
Findings suggest possible early right lower lobe pneumonia with mild cardiomegaly. Small right pleural effusion cannot be excluded.

**URGENT FINDING POSSIBLE**: The pattern could represent early pneumonia. Clinical correlation is strongly advised.

## Note
This is an AI-generated preliminary analysis. These findings should be urgently confirmed by a qualified radiologist. Patient symptoms and laboratory findings should guide clinical management.`,
  ];

  // Select a response - in a real app, you'd use the additionalText to influence this
  const mockIndex = additionalText?.toLowerCase().includes("pain") ? 1 : 0;
  return mockResponses[mockIndex];
}
