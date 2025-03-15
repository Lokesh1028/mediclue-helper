
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      "w-full px-6 py-4 border-b border-border/30 backdrop-blur-sm sticky top-0 z-10",
      "glassmorphism",
      className
    )}>
      <div className="container flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-medical to-medical-dark flex items-center justify-center text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6"
            >
              <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" />
              <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 12l4 4m0 -4l-4 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-medium leading-tight">MediClue</h1>
            <p className="text-xs text-muted-foreground">Medical Imaging Assistant</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Support
          </a>
        </nav>
      </div>
    </header>
  );
}
