
import { Brain, FileWarning, Lock, MonitorSmartphone, ShieldCheck, Stethoscope } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-medical" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models analyze your medical images with high accuracy"
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-medical" />,
      title: "Clinical Support",
      description: "Get insights on anatomical structures, abnormalities, and potential diagnoses"
    },
    {
      icon: <FileWarning className="h-6 w-6 text-medical" />,
      title: "Urgent Finding Alerts",
      description: "Automatic flagging of potentially critical or urgent findings that require immediate attention"
    },
    {
      icon: <MonitorSmartphone className="h-6 w-6 text-medical" />,
      title: "Responsive Design",
      description: "Access the platform from any device - desktop, tablet, or mobile"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-medical" />,
      title: "HIPAA Compliant",
      description: "Adherence to patient privacy standards and security protocols"
    },
    {
      icon: <Lock className="h-6 w-6 text-medical" />,
      title: "Secure Analysis",
      description: "All uploaded images are processed securely and not stored permanently"
    }
  ];

  return (
    <section className="py-12 bg-muted/30 rounded-3xl border border-border/40 mb-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed to enhance your diagnostic workflow with powerful AI capabilities while maintaining security and ease of use.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
