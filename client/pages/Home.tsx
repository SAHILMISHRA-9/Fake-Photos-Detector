import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-blue-400" />
            <span className="font-bold text-xl text-white">DetectFake</span>
          </div>
          <Link to="/upload">
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Analyze Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Detect Fake Chat
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Screenshots
                </span>
              </h1>
              <p className="text-xl text-slate-300">
                Don't let manipulated chat screenshots fool you. Our AI-powered
                system detects signs of editing and helps you verify authenticity.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-slate-400 font-medium">What we detect:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Edited timestamps</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Deleted or rearranged messages</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Copy-paste artifacts</span>
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Visual inconsistencies</span>
                </li>
              </ul>
            </div>

            <Link to="/upload">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg h-12 rounded-lg"
              >
                Upload Screenshot <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <p className="text-sm text-slate-400">
              No personal data stored • Instant analysis • 100% private
            </p>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur-2xl" />
            <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 space-y-4">
              <div className="space-y-3">
                <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                <div className="h-4 bg-slate-700/50 rounded w-full" />
                <div className="h-4 bg-slate-700/50 rounded w-2/3" />
              </div>
              <div className="h-px bg-slate-700/50 my-4" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-700/50 rounded w-full" />
                <div className="h-4 bg-slate-700/50 rounded w-4/5" />
              </div>
              <div className="flex justify-center mt-8">
                <AlertTriangle className="w-16 h-16 text-yellow-400/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-800/50 border-t border-slate-700/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl" />
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 space-y-4 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/50">
                  <span className="text-xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Upload Screenshot
                </h3>
                <p className="text-slate-300">
                  Simply drag and drop or upload a chat screenshot from WhatsApp,
                  Instagram, or other platforms.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl" />
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 space-y-4 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-600/20 border border-cyan-500/50">
                  <span className="text-xl font-bold text-cyan-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  AI Analysis
                </h3>
                <p className="text-slate-300">
                  Our advanced AI system analyzes visual inconsistencies,
                  text patterns, and metadata for signs of manipulation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg blur-xl" />
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 space-y-4 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/50">
                  <span className="text-xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Get Results
                </h3>
                <p className="text-slate-300">
                  Receive a detailed report with clear explanations of any
                  suspicious findings and confidence levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Possible Results
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Likely Real */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <h3 className="text-xl font-semibold text-green-300">Likely Real</h3>
            </div>
            <p className="text-green-100/80">
              No significant signs of manipulation detected. The screenshot appears
              to be authentic.
            </p>
          </div>

          {/* Suspicious */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-700/50 rounded-lg p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <h3 className="text-xl font-semibold text-yellow-300">Suspicious</h3>
            </div>
            <p className="text-yellow-100/80">
              Some inconsistencies detected. May have been edited or contain
              irregularities worth investigating.
            </p>
          </div>

          {/* Likely Fake */}
          <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-700/50 rounded-lg p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <h3 className="text-xl font-semibold text-red-300">Likely Fake</h3>
            </div>
            <p className="text-red-100/80">
              Multiple signs of editing or manipulation detected. High probability
              the screenshot has been altered.
            </p>
          </div>
        </div>
      </section>

      {/* Important Note Section */}
      <section className="bg-slate-800/50 border-t border-slate-700/50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-8 space-y-4">
            <h3 className="text-lg font-semibold text-blue-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Disclaimer
            </h3>
            <p className="text-blue-100/80">
              This tool provides probabilistic results and is meant to flag
              potentially suspicious screenshots. It does not provide absolute proof
              of authenticity or manipulation. Always use this as one tool among
              others when verifying information. Results are not admissible as legal
              evidence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to verify chat authenticity?
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Upload a screenshot and get instant analysis powered by AI
        </p>
        <Link to="/upload">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg h-12 rounded-lg"
          >
            Get Started <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>DetectFake © 2024 • Protecting integrity through AI</p>
        </div>
      </footer>
    </div>
  );
}
