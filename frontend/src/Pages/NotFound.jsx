import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="shadow-elevated border-border/50">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-4xl font-bold text-foreground mb-2">404</CardTitle>
            <p className="text-xl text-muted-foreground">Page Not Found</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                <a href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/prediction">
                  <Search className="h-4 w-4 mr-2" />
                  Try Predictions
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;