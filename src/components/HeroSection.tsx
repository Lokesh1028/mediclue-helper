
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30 rounded-3xl border border-border/40 mb-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block px-3 py-1 text-sm rounded-full bg-medical/10 text-medical mb-2 w-fit">
              Advanced Medical Imaging Analysis
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              AI-Powered Insights for Medical Professionals
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              Upload medical images like X-rays or CT scans and get instant AI analysis to assist in your diagnostic process. Fast, reliable, and research-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('upload-section')?.scrollIntoView({behavior: 'smooth'})}>
                Try Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/documentation'}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-medical/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-medical-dark/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Medical Imaging AI" 
                  className="w-full h-full object-cover rounded-2xl shadow-xl shadow-muted/30 border border-border"
                />
                <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-lg shadow-lg border border-border">
                  <div className="text-sm font-medium">AI Analysis</div>
                  <div className="text-xs text-muted-foreground">Instant insights from your images</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
