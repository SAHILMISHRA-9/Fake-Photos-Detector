import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Upload as UploadIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      // Store results in localStorage and navigate
      localStorage.setItem("analysisResult", JSON.stringify(data));
      navigate("/results");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to analyze image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <Shield className="w-7 h-7 text-blue-400" />
            <span className="font-bold text-xl text-white">DetectFake</span>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              Back
            </Button>
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Upload Chat Screenshot
            </h1>
            <p className="text-lg text-slate-400">
              Select a chat screenshot to analyze for signs of manipulation
            </p>
          </div>

          {!preview ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-slate-600 bg-slate-800/30 hover:border-slate-500"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <UploadIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Drag and drop your screenshot here
              </h2>
              <p className="text-slate-400 mb-4">
                or click to browse files
              </p>
              <p className="text-sm text-slate-500">
                Supports JPG, PNG, WebP • Max 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
                <div className="aspect-auto max-h-96 overflow-y-auto flex items-center justify-center bg-slate-900/50">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-auto"
                  />
                </div>
                <button
                  onClick={clearFile}
                  className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-white">{file?.name}</span>
                  {" "} • {" "}
                  <span>
                    {((file?.size || 0) / 1024).toFixed(1)} KB
                  </span>
                </p>
              </div>
            </div>
          )}

          {preview && (
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12 rounded-lg text-base font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Screenshot"
                )}
              </Button>
              <Button
                onClick={clearFile}
                disabled={isLoading}
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-700 h-12 rounded-lg text-base"
              >
                Clear
              </Button>
            </div>
          )}

          {!preview && (
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-blue-300">Tips for best results:</h3>
              <ul className="space-y-2 text-blue-100/80 text-sm">
                <li>• Use a clear, readable screenshot of the chat</li>
                <li>• Include full messages and timestamps</li>
                <li>• Avoid heavily compressed or low-resolution images</li>
                <li>• The full conversation context helps improve accuracy</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
