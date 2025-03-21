
/// <reference types="vite/client" />

declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(options: {
      model: string;
      systemInstruction?: string;
    }): GenerativeModel;
  }

  export interface GenerativeModel {
    generateContent(options: {
      contents: Array<{
        role: string;
        parts: Array<{
          text?: string;
          inlineData?: {
            data: string;
            mimeType: string;
          };
        }>;
      }>;
      generationConfig?: {
        temperature?: number;
        topP?: number;
        topK?: number;
        maxOutputTokens?: number;
      };
    }): Promise<{
      response: {
        text(): string;
      };
    }>;
  }
}
