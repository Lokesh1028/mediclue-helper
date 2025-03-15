
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ResultSectionProps {
  result: string;
  className?: string;
}

export function ResultSection({ result, className }: ResultSectionProps) {
  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Process the markdown-like content
  useEffect(() => {
    if (!result) return;

    // Check for urgent findings
    const hasUrgentFindings = result.includes("URGENT FINDING");
    
    // Parse the markdown-like content
    const sections = result.split('\n\n').map((section, i) => {
      // Handle headers
      if (section.startsWith('# ')) {
        return <h2 key={i} className="text-2xl font-medium mb-4">{section.substring(2)}</h2>;
      }
      if (section.startsWith('## ')) {
        return <h3 key={i} className="text-lg font-medium mt-6 mb-2">{section.substring(3)}</h3>;
      }
      if (section.startsWith('### ')) {
        return <h4 key={i} className="text-md font-medium mt-4 mb-1">{section.substring(4)}</h4>;
      }
      
      // Handle lists
      if (section.includes('\n- ')) {
        const listTitle = section.split('\n')[0];
        const listItems = section.split('\n- ').slice(1);
        
        return (
          <div key={i} className="mb-4">
            {listTitle && <p className="mb-2">{listTitle}</p>}
            <ul className="list-disc pl-5 space-y-1">
              {listItems.map((item, j) => (
                <li key={j} className="text-sm">
                  {/* Bold text between ** marks */}
                  {item.includes('**') ? (
                    <>
                      <span className="font-medium">{item.split('**')[1]}</span>: {item.split('**')[2]}
                    </>
                  ) : item}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Handle urgent findings with special styling
      if (section.toUpperCase().includes('URGENT') && section.includes('**')) {
        return (
          <Alert key={i} variant="destructive" className="mt-4 mb-2">
            <AlertTitle className="text-base">Urgent Finding Detected</AlertTitle>
            <AlertDescription className="text-sm">{section.replace(/\*\*/g, '')}</AlertDescription>
          </Alert>
        );
      }
      
      // Regular paragraphs
      return <p key={i} className="mb-4 text-sm text-balance">{section}</p>;
    });
    
    setRenderedContent(<>{sections}</>);
    
    // Scroll content into view when loaded
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result]);
  
  if (!result) return null;
  
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)} ref={contentRef}>
      <Card className="bg-white/90 backdrop-blur-sm border-border/40 overflow-hidden animate-slide-in-right">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <div className="prose max-w-none">
            {renderedContent}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
