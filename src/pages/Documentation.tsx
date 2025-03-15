
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Documentation() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto py-12 px-4 md:px-6">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to use MediClue effectively and understand its capabilities and limitations.
            </p>
          </div>
          
          <Tabs defaultValue="getting-started" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="features">Features & Capabilities</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started" className="mt-6 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Getting Started with MediClue</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">1. Preparing Your Images</h3>
                      <p className="mb-2">For optimal results, ensure your medical images meet these criteria:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Use high-quality, uncompressed images when possible</li>
                        <li>Supported formats: JPEG, PNG, DICOM (converted)</li>
                        <li>Ensure proper orientation of the image</li>
                        <li>Remove any patient identifying information (for privacy)</li>
                        <li>Maximum file size: 15MB</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">2. Uploading Images</h3>
                      <p className="mb-2">Follow these steps to upload and analyze your images:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Navigate to the MediClue homepage</li>
                        <li>Click on the upload area or drag and drop your image file</li>
                        <li>Add any relevant clinical context in the text field (optional but recommended)</li>
                        <li>Click "Analyze Image" to start the processing</li>
                        <li>Wait for the analysis to complete (typically 5-15 seconds)</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">3. Understanding Results</h3>
                      <p className="mb-2">The analysis results are presented in a structured format:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Findings:</strong> Detailed observations about anatomical structures</li>
                        <li><strong>Impression:</strong> Summary assessment based on the findings</li>
                        <li><strong>Urgent Findings:</strong> Highlighted in red if potentially critical issues are detected</li>
                        <li><strong>Notes:</strong> Additional information including limitations of the analysis</li>
                      </ul>
                      <p className="mt-2 text-muted-foreground italic">Remember that all results should be verified by a qualified healthcare professional.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Features & Capabilities</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">Supported Image Types</h3>
                      <p className="mb-2">MediClue can analyze various medical imaging modalities:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>X-rays:</strong> Chest, extremities, abdominal</li>
                        <li><strong>CT Scans:</strong> Brain, chest, abdomen</li>
                        <li><strong>MRI:</strong> Brain, spine, joints</li>
                        <li><strong>Ultrasound:</strong> Abdominal, cardiac (limited capabilities)</li>
                        <li><strong>Mammography:</strong> Screening and diagnostic (limited capabilities)</li>
                      </ul>
                      <p className="mt-2 text-muted-foreground">Performance varies by modality, with X-rays and CT scans currently having the highest accuracy rates.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Analysis Capabilities</h3>
                      <p className="mb-2">MediClue can identify and highlight various findings:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Common pathologies (pneumonia, fractures, tumors, etc.)</li>
                        <li>Anatomical measurements and comparisons</li>
                        <li>Tissue density and texture abnormalities</li>
                        <li>Fluid collections and air spaces</li>
                        <li>Foreign objects</li>
                        <li>Urgent findings requiring immediate attention</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Limitations</h3>
                      <p className="mb-2">It's important to understand what MediClue cannot do:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Provide definitive diagnoses</li>
                        <li>Replace radiologist interpretation</li>
                        <li>Recommend specific treatments</li>
                        <li>Analyze rare conditions with limited training data</li>
                        <li>Process multiple images simultaneously (coming soon)</li>
                        <li>Guarantee identification of all abnormalities</li>
                      </ul>
                      <p className="mt-2 text-red-500 font-medium">MediClue is an assistive tool and should not be used as the sole basis for medical decisions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="best-practices" className="mt-6 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Best Practices for Using MediClue</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">Optimizing Results</h3>
                      <ul className="list-disc pl-6 space-y-3">
                        <li>
                          <strong>Provide relevant clinical context:</strong> 
                          <p>Adding patient demographics, symptoms, or clinical questions can significantly improve the accuracy and relevance of the analysis.</p>
                        </li>
                        <li>
                          <strong>Use high-quality images:</strong> 
                          <p>Ensure proper exposure, positioning, and clarity of the original image for best results.</p>
                        </li>
                        <li>
                          <strong>Compare with previous results:</strong> 
                          <p>When available, reviewing changes against prior images can provide valuable insights.</p>
                        </li>
                        <li>
                          <strong>Verify findings:</strong> 
                          <p>Always have a qualified healthcare professional review and confirm the AI-generated analysis.</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Professional Integration</h3>
                      <p className="mb-2">Suggestions for incorporating MediClue into clinical workflow:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use as a preliminary screening tool before formal interpretation</li>
                        <li>Employ as a second opinion after your initial assessment</li>
                        <li>Utilize for educational purposes and training</li>
                        <li>Consider as a quality assurance check for missed findings</li>
                        <li>Reference for standardized reporting structure</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Ethical Considerations</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Always prioritize patient privacy and data security</li>
                        <li>Be transparent with patients about the use of AI assistance</li>
                        <li>Maintain clear documentation of both AI and human interpretations</li>
                        <li>Consider potential biases in AI training data</li>
                        <li>Follow institutional policies regarding AI use in clinical settings</li>
                      </ul>
                      <p className="mt-3 text-muted-foreground">Remember that AI tools like MediClue are designed to augment—not replace—clinical judgment and expertise.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
