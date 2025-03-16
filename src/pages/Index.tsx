
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { ResultSection } from "@/components/ResultSection";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { analyzeImage } from "@/utils/api";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { HowToUse } from "@/components/HowToUse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Copyright, Linkedin, MessageSquarePlus, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState<string[]>([
    "Initializing image analysis...",
    "Processing visual features...", 
    "Identifying anatomical structures...",
    "Applying medical context...",
    "Generating detailed report..."
  ]);
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);

  const handleSubmit = async (imageFile: File, text: string) => {
    setAnalyzing(true);
    setError(null);
    setCurrentLoadingIndex(0);
    
    // Set up interval to cycle through loading messages
    const messageInterval = setInterval(() => {
      setCurrentLoadingIndex((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000); // Change message every 2 seconds
    
    try {
      // Add artificial delay to make it feel more realistic
      const fetchData = async () => {
        // Minimum delay of 5 seconds to look more realistic
        const minDelay = new Promise(resolve => setTimeout(resolve, 5000));
        const analysisResult = await analyzeImage(imageFile, text);
        
        // Wait for minimum delay to complete
        await minDelay;
        return analysisResult;
      };
      
      const analysisResult = await fetchData();
      clearInterval(messageInterval);
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
      clearInterval(messageInterval);
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error("Analysis failed. Please try again.", {
        duration: 5000,
      });
      setResult(null);
    } finally {
      setAnalyzing(false);
      setRetrying(false);
    }
  };

  const handleNewChat = () => {
    // Reset all states to start a new session
    setResult(null);
    setError(null);
    toast.success("Started a new session", {
      duration: 2000,
    });
    
    // Scroll to upload section
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRetry = () => {
    setRetrying(true);
    setError(null);
    // Force reload the page 
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 md:px-6">
        <HeroSection />
        
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-3">
            Medical Imaging Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Upload medical images for AI-assisted analysis. Results are for educational purposes only and should be confirmed by a qualified healthcare professional.
          </p>
        </div>
        
        <div className="space-y-8" id="upload-section">
          {error ? (
            <Alert variant="destructive" className="max-w-3xl mx-auto">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription className="mt-2">
                {error}
                <div className="mt-4 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={handleRetry}
                    className="flex items-center"
                    disabled={retrying}
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${retrying ? 'animate-spin' : ''}`} />
                    {retrying ? 'Retrying...' : 'Retry Connection'}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <UploadSection 
              onSubmit={handleSubmit} 
              isLoading={analyzing} 
            />
          )}
          
          {analyzing && (
            <div className="my-8 animate-fade-in">
              <LoadingIndicator 
                message={loadingMessages[currentLoadingIndex]}
              />
              <div className="max-w-md mx-auto mt-6">
                <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                  <div 
                    className="absolute left-0 h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${(currentLoadingIndex + 1) * (100 / loadingMessages.length)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {result && !analyzing && (
            <>
              <ResultSection result={result} />
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={handleNewChat}
                  className="bg-primary hover:bg-primary/90 transition-colors"
                >
                  <MessageSquarePlus className="mr-2 h-5 w-5" />
                  New Chat
                </Button>
              </div>
            </>
          )}
        </div>
        
        <Features />
        <HowToUse />
      </main>
      
      <footer className="border-t border-border/30 py-6 px-4 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>
            MediClue is an AI-assisted tool for medical professionals. Results should always be 
            confirmed by qualified healthcare providers. Not for diagnostic use.
          </p>
          <p className="mt-2">
            <a 
              href="https://www.linkedin.com/in/lokesh-reddy-dodla/"
              className="inline-flex items-center hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Copyright className="h-4 w-4 mr-1" />
              <span>2023 MediClue. All rights reserved.</span>
              <Linkedin className="h-4 w-4 ml-2" />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
