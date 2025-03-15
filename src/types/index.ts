
export interface AnalysisResult {
  text: string;
  urgentFindings?: boolean;
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}
