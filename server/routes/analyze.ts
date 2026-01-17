import { RequestHandler } from "express";

interface AnalysisResponse {
  verdict: "likely_real" | "suspicious" | "likely_fake";
  confidence: number;
  findings: string[];
  explanation: string;
  timestamp: string;
}

// Mock analysis function - in production, this would use actual image processing
// You could replace this with calls to Python backend, OpenCV, TensorFlow, etc.
function analyzeImage(
  imageName: string,
  imageSize: number
): AnalysisResponse {
  // Seed random based on filename for consistent results
  let seed = 0;
  for (let i = 0; i < imageName.length; i++) {
    seed += imageName.charCodeAt(i);
  }

  // Pseudo-random number generator
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Simulate image analysis with various checks
  const checks = [
    {
      name: "Timestamp Consistency",
      passed: seededRandom() > 0.3,
      weight: 0.25,
    },
    {
      name: "Text Rendering Consistency",
      passed: seededRandom() > 0.25,
      weight: 0.2,
    },
    {
      name: "Message Ordering Logic",
      passed: seededRandom() > 0.2,
      weight: 0.2,
    },
    {
      name: "Visual Artifacts Detection",
      passed: seededRandom() > 0.35,
      weight: 0.15,
    },
    {
      name: "Compression Consistency",
      passed: seededRandom() > 0.3,
      weight: 0.2,
    },
  ];

  const findings: string[] = [];
  let failedChecks = 0;

  if (!checks[0].passed) {
    findings.push(
      "Timestamps show irregular spacing or formatting inconsistencies"
    );
    failedChecks++;
  }
  if (!checks[1].passed) {
    findings.push(
      "Text rendering varies between different messages in the screenshot"
    );
    failedChecks++;
  }
  if (!checks[2].passed) {
    findings.push(
      "Message ordering appears illogical or messages may have been rearranged"
    );
    failedChecks++;
  }
  if (!checks[3].passed) {
    findings.push(
      "Visual artifacts detected that suggest image manipulation or cropping"
    );
    failedChecks++;
  }
  if (!checks[4].passed) {
    findings.push(
      "Compression artifacts vary across different regions of the image"
    );
    failedChecks++;
  }

  // Determine verdict based on checks
  let verdict: "likely_real" | "suspicious" | "likely_fake";
  let confidence: number;

  if (failedChecks === 0) {
    verdict = "likely_real";
    confidence = 0.85 + seededRandom() * 0.15;
  } else if (failedChecks === 1) {
    verdict = "likely_real";
    confidence = 0.65 + seededRandom() * 0.15;
  } else if (failedChecks <= 2) {
    verdict = "suspicious";
    confidence = 0.6 + seededRandom() * 0.2;
  } else {
    verdict = "likely_fake";
    confidence = 0.75 + seededRandom() * 0.2;
  }

  const explanationMap = {
    likely_real: `This screenshot shows minimal signs of manipulation. The analysis found ${
      findings.length === 0
        ? "no significant inconsistencies"
        : "only minor variations that could be due to different device models or app versions"
    }. The text rendering, timestamps, and message ordering appear consistent with genuine chat data. However, remember that this is a probabilistic assessment and some sophisticated edits might not be detected.`,

    suspicious: `This screenshot contains several irregularities that suggest possible editing. The detected issues include ${findings.slice(0, 2).join(" and ")}. These findings alone don't confirm manipulation, as they could result from different devices, app versions, or screenshot cropping. We recommend investigating further or comparing with original source if possible.`,

    likely_fake: `Multiple indicators suggest this screenshot has been edited or manipulated. The analysis detected ${failedChecks} significant issues including ${findings
      .slice(0, 3)
      .join(", ")}. These are common signs of screenshot editing. However, always verify with the message sender directly and never make critical decisions based solely on this analysis.`,
  };

  return {
    verdict,
    confidence,
    findings: findings.length > 0 ? findings : ["No significant issues detected"],
    explanation: explanationMap[verdict],
    timestamp: new Date().toISOString(),
  };
}

export const handleAnalyze: RequestHandler = async (req, res) => {
  try {
    // Get file from request
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    // Validate file type
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        error: "File must be an image",
      });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({
        error: "File size exceeds 10MB limit",
      });
    }

    // Perform analysis
    const result = analyzeImage(file.originalname, file.size);

    res.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze image",
    });
  }
};
