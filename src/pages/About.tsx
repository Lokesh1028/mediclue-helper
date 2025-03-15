
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, HeartPulse, Shield, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto py-12 px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About MediClue</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming medical image analysis with artificial intelligence to support healthcare professionals.
            </p>
          </div>
          
          <section className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-medical" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>MediClue aims to enhance medical diagnostics by providing AI-powered tools that assist healthcare professionals in analyzing medical images. We strive to improve patient outcomes by enabling faster and more accurate preliminary assessments.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-medical" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We envision a future where AI and human expertise work in harmony to deliver the highest standard of healthcare. MediClue is committed to becoming an indispensable tool in the diagnostic workflow of medical professionals worldwide.</p>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Our Core Values</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-medical/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-medical" />
                </div>
                <h3 className="text-xl font-medium mb-2">Privacy & Security</h3>
                <p className="text-muted-foreground">We prioritize patient data protection and adhere to healthcare privacy standards like HIPAA and GDPR.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-medical/10 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-medical" />
                </div>
                <h3 className="text-xl font-medium mb-2">Innovation</h3>
                <p className="text-muted-foreground">We continuously improve our AI models and user experience to deliver cutting-edge solutions.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-medical/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-medical" />
                </div>
                <h3 className="text-xl font-medium mb-2">Collaboration</h3>
                <p className="text-muted-foreground">We believe in the power of combining AI technology with human expertise to achieve the best results.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-muted/30 p-8 rounded-xl border border-border/40">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Our Approach</h2>
              <p className="text-muted-foreground">How we deliver value to healthcare professionals</p>
            </div>
            
            <div className="space-y-4">
              <p>At MediClue, we understand that AI should complement, not replace, the expertise of healthcare professionals. Our platform is designed to be an assistive tool that provides preliminary analysis, helping clinicians identify potential areas of concern more efficiently.</p>
              
              <p>We use state-of-the-art deep learning models trained on diverse medical imaging datasets. These models can identify patterns and anomalies in X-rays, CT scans, MRIs, and other medical images, providing structured reports that highlight key findings.</p>
              
              <p>Unlike other platforms, MediClue emphasizes transparency. We clearly communicate the limitations of AI analysis and always recommend human verification of all results. Our system is designed to be a second set of eyes, not the final word on diagnosis.</p>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="border-t border-border/30 py-6 px-4 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>
            MediClue is an AI-assisted tool for medical professionals. Results should always be 
            confirmed by qualified healthcare providers. Not for diagnostic use.
          </p>
          <p className="mt-2">
            <a href="https://www.linkedin.com/in/lokesh-reddy-dodla/" className="inline-flex items-center hover:text-foreground transition-colors">
              © 2023 MediClue. All rights reserved.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
