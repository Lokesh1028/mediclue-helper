
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema with validation
const formSchema = z.object({
  additionalText: z.string().min(1, "Please enter your symptoms or query")
});

type FormValues = z.infer<typeof formSchema>;

interface UploadSectionProps {
  onSubmit: (imageFile: File | null, text: string) => void;
  isLoading: boolean;
  className?: string;
}

export function UploadSection({ onSubmit, isLoading, className }: UploadSectionProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Setup form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      additionalText: ""
    }
  });

  // Listen for result changes - this will help reset the upload form
  // when a new chat is started (result is set to null)
  useEffect(() => {
    // If there's no active analysis and no result, reset form
    if (!isLoading) {
      // Only reset when component mounts or when specifically instructed
      // by parent component (controlled via props)
    }
  }, [isLoading]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    // Image is optional, text is required (enforced by form validation)
    onSubmit(imageFile, values.additionalText);
  };

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // When there's no result, reset the form
  useEffect(() => {
    if (!isLoading) {
      resetForm();
    }
  }, []);

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <Card className="bg-white/90 backdrop-blur-sm border-border/40 overflow-hidden animate-fade-in">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-all",
                  "hover:bg-secondary/50 group cursor-pointer",
                  dragActive ? "border-primary bg-secondary/70" : "border-border",
                  imagePreview ? "relative bg-secondary/30" : ""
                )}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                
                {imagePreview ? (
                  <div className="relative aspect-video w-full flex items-center justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-[300px] max-w-full object-contain rounded-md animate-fade-in"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-md">
                      <p className="text-white font-medium">Click to change image</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    <svg
                      className="mx-auto h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <line x1="16" x2="22" y1="5" y2="5" />
                      <line x1="19" x2="19" y1="2" y2="8" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <h3 className="mt-4 text-sm font-medium text-foreground">
                      Click to upload or drag and drop (Optional)
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      X-Ray, CT scan or other medical images
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="additionalText"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your symptoms or medical query (Required)"
                          className="resize-none min-h-[100px] bg-background/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="w-full transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : imageFile ? "Analyze Image & Text" : "Submit Query"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
