
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { ResultSection } from "@/components/ResultSection";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { analyzeImage } from "@/utils/api";

const Index = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (imageFile: File, text: string) => {
    setAnalyzing(true);
    
    try {
      const analysisResult = await analyzeImage(imageFile, text);
      setResult(analysisResult);
      
      // Check if result contains urgent findings
      if (analysisResult.toUpperCase().includes("URGENT")) {
        toast.warning("Urgent findings detected. Please review the results immediately.", {
          duration: 8000,
        });
      } else {
        toast.success("Analysis completed successfully", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("An error occurred during analysis. Please try again.");
      setResult(null);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-medium mb-3">
            Medical Imaging Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Upload medical images for AI-assisted analysis. Results are for educational purposes only and should be confirmed by a qualified healthcare professional.
          </p>
        </div>
        
        <div className="space-y-8">
          <UploadSection 
            onSubmit={handleSubmit} 
            isLoading={analyzing} 
          />
          
          {analyzing && (
            <div className="my-8">
              <LoadingIndicator />
            </div>
          )}
          
          {result && !analyzing && (
            <ResultSection result={result} />
          )}
        </div>
      </main>
      
      <footer className="border-t border-border/30 py-6 px-4 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>
            MediClue is an AI-assisted tool for medical professionals. Results should always be 
            confirmed by qualified healthcare providers. Not for diagnostic use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
