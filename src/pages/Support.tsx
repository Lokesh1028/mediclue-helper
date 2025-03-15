
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

export default function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // In a real app, this would be an API call
      const mailtoLink = `mailto:dlreddy1028@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.open(mailtoLink, "_blank");
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your support request has been sent!");
      
      // Reset form after showing success for a moment
      setTimeout(() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const faqs = [
    {
      question: "What types of medical images can MediClue analyze?",
      answer: "MediClue can analyze various medical imaging modalities including X-rays, CT scans, MRIs, and certain ultrasound images. Performance may vary by modality type."
    },
    {
      question: "Is my patient data secure when I use MediClue?",
      answer: "Yes, MediClue is designed with privacy and security as top priorities. We adhere to HIPAA guidelines and do not permanently store any uploaded images or personal information."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "While our AI models are continuously improving, accuracy varies depending on image quality, modality, and pathology. MediClue should be used as an assistive tool only, with all findings verified by qualified healthcare professionals."
    },
    {
      question: "Can I use MediClue for official diagnoses?",
      answer: "No, MediClue is designed as an educational and assistive tool only. It should not be used as the sole basis for diagnosis, treatment decisions, or other clinical purposes without professional medical verification."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Support Center</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you get the most out of MediClue.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-medical" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Quick answers to common questions about MediClue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="pb-4 border-b border-border/40 last:border-0">
                      <h3 className="font-medium mb-1">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = '/documentation'}>
                    View Full Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-medical" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>
                    Send us a message and we'll get back to you soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll respond to your inquiry as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder="your.email@example.com" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject" 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="How can we help you?" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Please describe your issue or question in detail..." 
                            rows={4} 
                            required 
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </CardContent>
                <CardFooter>
                  {!isSubmitted && (
                    <Button 
                      className="w-full" 
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-medical/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-medical" />
                </div>
                <h3 className="font-medium mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:dlreddy1028@gmail.com" 
                  className="text-medical hover:underline"
                >
                  dlreddy1028@gmail.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-medical/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-medical" />
                </div>
                <h3 className="font-medium mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Available Monday-Friday, 9AM-5PM EST
                </p>
                <span className="text-medical">+1 (555) 123-4567</span>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-medical/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-medical" />
                </div>
                <h3 className="font-medium mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team in real-time
                </p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
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
