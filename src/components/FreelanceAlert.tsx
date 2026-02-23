import { useState } from "react";
import { X, Rocket } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FreelanceAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 px-4">
      <Alert className="container mx-auto flex items-center justify-between rounded-xl border-primary/30 bg-primary/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm font-medium text-foreground">
            🚀 Available for Freelance & Remote Opportunities
          </AlertDescription>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
};

export default FreelanceAlert;
