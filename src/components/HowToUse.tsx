
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, FileText, ListChecks, Upload } from "lucide-react";

export function HowToUse() {
  const steps = [
    {
      icon: <FileImage className="h-8 w-8 text-medical" />,
      title: "Prepare Your Image",
      description: "Select a high-quality medical image (X-ray, CT scan, MRI, etc.) in JPG, PNG or DICOM format."
    },
    {
      icon: <Upload className="h-8 w-8 text-medical" />,
      title: "Upload",
      description: "Use the drag and drop area or file browser to upload your image for analysis."
    },
    {
      icon: <FileText className="h-8 w-8 text-medical" />,
      title: "Add Context (Optional)",
      description: "Provide additional details about the patient or image to improve analysis accuracy."
    },
    {
      icon: <ListChecks className="h-8 w-8 text-medical" />,
      title: "Review Results",
      description: "View the AI-generated analysis with highlighted findings and recommendations."
    }
  ];

  return (
    <section className="py-12 mb-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in just a few simple steps to receive AI-assisted insights on your medical images.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full border-l-2 border-dashed border-border/70 ml-6 md:ml-9 -z-10 hidden md:block" />
          
          <div className="space-y-8 relative">
            {steps.map((step, index) => (
              <Card key={index} className="shadow-sm border-border/70">
                <CardContent className="flex p-6 gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    {step.icon}
                  </div>
                  <div className="flex-grow pt-1">
                    <h3 className="text-xl font-medium mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
