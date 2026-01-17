import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <Shield className="w-7 h-7 text-blue-400" />
            <span className="font-bold text-xl text-white">DetectFake</span>
          </Link>
        </div>
      </nav>

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              404
            </h1>
            <h2 className="text-3xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 space-y-4">
            <p className="text-slate-300">
              Let's get you back on track. You can:
            </p>
            <ul className="text-left text-slate-400 space-y-2 text-sm">
              <li>• Return to the home page</li>
              <li>• Upload a screenshot for analysis</li>
              <li>• Learn more about our detection system</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link to="/" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12 rounded-lg">
                Back to Home
              </Button>
            </Link>
            <Link to="/upload" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-200 hover:bg-slate-700 h-12 rounded-lg"
              >
                Upload Screenshot
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
