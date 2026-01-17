import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";

interface AnalysisResult {
  verdict: "likely_real" | "suspicious" | "likely_fake";
  confidence: number;
  findings: string[];
  explanation: string;
  timestamp: string;
}

export default function Results() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
        localStorage.removeItem("analysisResult");
      } catch (e) {
        setError("Failed to load results");
      }
    } else {
      setError("No analysis results found");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80">
              <Shield className="w-7 h-7 text-blue-400" />
              <span className="font-bold text-xl text-white">DetectFake</span>
            </Link>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-300 mb-2">
              Error Loading Results
            </h1>
            <p className="text-red-200/80 mb-6">{error}</p>
            <Link to="/upload">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Upload Another Screenshot
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading results...</p>
        </div>
      </div>
    );
  }

  const verdictConfig = {
    likely_real: {
      title: "Likely Real",
      color: "green",
      icon: CheckCircle2,
      description: "No significant signs of manipulation detected",
    },
    suspicious: {
      title: "Suspicious",
      color: "yellow",
      icon: AlertTriangle,
      description: "Some inconsistencies detected that warrant attention",
    },
    likely_fake: {
      title: "Likely Fake",
      color: "red",
      icon: AlertCircle,
      description: "Multiple signs of manipulation or editing detected",
    },
  };

  const config = verdictConfig[result.verdict];
  const colorMap = {
    green: {
      bg: "bg-green-900/20",
      border: "border-green-700/50",
      text: "text-green-300",
      textAlt: "text-green-100/80",
      badge: "bg-green-500/20 text-green-300 border-green-600/50",
      icon: "text-green-400",
    },
    yellow: {
      bg: "bg-yellow-900/20",
      border: "border-yellow-700/50",
      text: "text-yellow-300",
      textAlt: "text-yellow-100/80",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-600/50",
      icon: "text-yellow-400",
    },
    red: {
      bg: "bg-red-900/20",
      border: "border-red-700/50",
      text: "text-red-300",
      textAlt: "text-red-100/80",
      badge: "bg-red-500/20 text-red-300 border-red-600/50",
      icon: "text-red-400",
    },
  };

  const colors = colorMap[config.color as keyof typeof colorMap];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <Shield className="w-7 h-7 text-blue-400" />
            <span className="font-bold text-xl text-white">DetectFake</span>
          </Link>
          <Link to="/upload">
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Analyze Another
            </Button>
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {/* Main Result Card */}
          <div className={`${colors.bg} border ${colors.border} rounded-lg p-8 space-y-6`}>
            <div className="flex items-start gap-4">
              <IconComponent className={`w-12 h-12 ${colors.icon} flex-shrink-0 mt-1`} />
              <div className="flex-1">
                <h1 className={`text-4xl font-bold ${colors.text}`}>
                  {config.title}
                </h1>
                <p className={`text-lg ${colors.textAlt} mt-2`}>
                  {config.description}
                </p>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="space-y-3 pt-4 border-t border-slate-600/30">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Confidence Level</span>
                <span className={`text-xl font-bold ${colors.text}`}>
                  {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    config.color === "green"
                      ? "bg-green-500"
                      : config.color === "yellow"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Findings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Detailed Findings</h2>
            <div className="space-y-3">
              {result.findings.map((finding, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        config.color === "green"
                          ? "bg-green-500"
                          : config.color === "yellow"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <p className="text-slate-200">{finding}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Detailed Explanation</h2>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <p className="text-slate-200 leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-blue-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Reminder
            </h3>
            <p className="text-blue-100/80">
              These results are probabilistic and based on visual analysis. This tool
              is designed to flag potentially suspicious screenshots but does not
              provide absolute proof. Always consider context, use multiple verification
              methods, and never rely on this tool alone for critical decisions. Results
              are not admissible as legal evidence.
            </p>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <Link to="/upload" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12 rounded-lg text-base font-semibold">
                Analyze Another Screenshot
              </Button>
            </Link>
            <Link to="/" className="w-full">
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-200 hover:bg-slate-700 h-12 rounded-lg text-base"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
